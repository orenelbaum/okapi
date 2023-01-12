import { isVariableDeclarationOperatorToken } from '../operator/is-variable-declaration-operator-token.type-guard'
import { 
    blockStack,
    getCurrentIndentationLevel, 
    getCurrentToken, 
    getCurrentTokenizedLine, 
    goToNextColumn, 
    goToNextLine, 
    parsingContext 
} from '../../tygon-code-to-ast/parsing/parsing-context';
import { createIdentifierNode } from '../identifier/identifier-node.interface'
import { tryToReadExpression } from '../expression/try-to-read-expression';
import { ExpressionNode } from '../expression/expression-node.type'
import { createVariableDeclarationNode } from './variable-declaration-node.interface'
import { OperatorType } from '../operator/operator-type.enum'
import { VariableType } from './variable-type.enum';
import { readBlock } from '../block/read-block';
import { createBinaryExpressionNode } from '../expression/binary-expression/binary-expression-node.interface';
import { tokenizedLines } from '../../js-ast-to-code/ast-tokenization/tokenization-context';


export function tryToReadVariableDeclaration() {    
    const variableDeclarationOperatorToken = getCurrentToken()
    if (!isVariableDeclarationOperatorToken(variableDeclarationOperatorToken))
        return false
    goToNextColumn()

    // Try to read variable identifier
    if (!getCurrentToken() || getCurrentToken().type !== "identifier")
        throw new Error(
            "Invalid variable declaration, Expected identifier, instead recieved the following token: "
            + JSON.stringify(getCurrentToken())
        )
    const identifierNode = createIdentifierNode({ name: getCurrentToken().name as string })
    goToNextColumn()

    // Look for assignment operator
    const assignmentOperatorToken = getCurrentToken()
    if (
        !assignmentOperatorToken
        || assignmentOperatorToken.type !== "operator"
        || assignmentOperatorToken.operatorType !== OperatorType.assignment
    )
        throw new Error(
            "Invalid variable declaration, Expected assignment operator, instead recieved the following token: "
            + JSON.stringify(assignmentOperatorToken)
        )
    goToNextColumn()

    // Try to read init in the same line
    const inlineInit = tryToReadExpression() as ExpressionNode
    let initInNextLine
    if (!inlineInit) {
        initInNextLine = readInitNextLine()
        console.log({ initInNextLine })
        if (!initInNextLine) throw new Error(
            "Invalid variable declaration."
            + "expected init expression, instead recieved an invalid expression or no expression at all."
        )
    }

    return createVariableDeclarationNode({
        identifier: identifierNode,
        init: inlineInit || initInNextLine,
        variableType: variableDeclarationOperatorToken.operatorType as unknown as VariableType
    })
}

function readInitNextLine(): ExpressionNode | undefined {
    goToNextLine()
    if (
        !getCurrentTokenizedLine()
        || (
            getCurrentTokenizedLine().indentationLevel !== 
            getCurrentIndentationLevel() + 1
        )
    )
        return
        
    const firstExpression = tryToReadExpression({ indentationLevel: getCurrentIndentationLevel() + 1 })
    if (!firstExpression) return


    goToNextLine()
    
    // Check if next line continues the blcok / action chain
    if (
        !getCurrentTokenizedLine()
        || (
            getCurrentTokenizedLine().indentationLevel !== 
            getCurrentIndentationLevel() + 1
        )
        || !getCurrentToken()
    )
        return firstExpression
    
    if (getCurrentToken().type === "operator") {
        return continueReadingInitAsActionChain({ firstExpression })
    }
    
    else return continueReadingInitAsBlock({ firstExpression })
}

function continueReadingInitAsActionChain(
    { firstExpression }: { firstExpression: ExpressionNode }
): ExpressionNode {
    let expression = firstExpression
    blockStack.push(expression)
    while (true) {
        const operatorToken = getCurrentToken()

        goToNextColumn()
        const chainLevelExpression = tryToReadExpression()
        if (!chainLevelExpression) throw new Error(
            "Invalid action chain. Expected an operator followed by an expression, recived an operator without a following expression."
        )
        expression = createBinaryExpressionNode({ 
            operatorType: operatorToken.operatorType as OperatorType, 
            left: expression, 
            right: chainLevelExpression
        })

        if (
            !tokenizedLines[parsingContext.currentLineIndex + 1]
            || (
                tokenizedLines[parsingContext.currentLineIndex + 1].indentationLevel <
                getCurrentIndentationLevel()
            )
        )
            break

        else if (
            tokenizedLines[parsingContext.currentLineIndex + 1].indentationLevel >
            getCurrentIndentationLevel()
        )
            throw new Error("Invalid indentation in action chain.")
        
        goToNextLine()
        if (getCurrentToken().type !== 'operator') throw new Error(
            "Invalid action chain. Each line should start with an operator, but one line isn't."
        )
    }
    blockStack.pop()
    return expression
}

function continueReadingInitAsBlock(
    { firstExpression }: { firstExpression: ExpressionNode }
) {
    const blockNode = readBlock()
    blockNode.children.body = [firstExpression, ...blockNode.children.body]
    return blockNode
}