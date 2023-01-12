import { getCurrentTokenizedLine, getCurrentIndentationLevel, getCurrentToken, goToNextColumn, parsingContext } from '../../tygon-code-to-ast/parsing/parsing-context';
import { readBlock } from '../block/read-block'
import { tryToReadVariableDeclaration } from '../variable-declaration/try-to-read-variable-declaration';
import { tryToReadBinaryExpression } from './binary-expression/try-to-read-binary-expression';
import { tryToReadAtomicExpression } from './atomic-expression/try-to-read-atomic-expression';


/*
// export const log = (...thing: any) => {
//     console.log({
//         line: parsingContext.currentLineIndex,
//         column: parsingContext.currentColumnIndex,
//         indentationLevel: getCurrentIndentationLevel()
//     }, "=> ", ...thing)
// }
*/

// Tries to read an expression starting in the current cursor position
export function tryToReadExpression(options?: { indentationLevel?: number }) {
    const indentationLevel = options?.indentationLevel ?? getCurrentIndentationLevel()

    if (!getCurrentToken()) return false
    if (parsingContext.currentColumnIndex === 0) {
        // Try to read block
        if (getCurrentTokenizedLine().indentationLevel === indentationLevel + 1)
            return readBlock()
        
        // Check for invalid indentation
        if (getCurrentTokenizedLine().indentationLevel !== indentationLevel)
            throw new Error("Invalid indentation.")
    }
    
    const variableDeclarationNode = tryToReadVariableDeclaration()
    if (variableDeclarationNode) return variableDeclarationNode
    
    const binaryExpressionNode = tryToReadBinaryExpression()
    if (binaryExpressionNode) return binaryExpressionNode
    
    // const callExpressionNode = tryToReadCallExpression()
    // if (callExpressionNode) return callExpressionNode
    
    const atomicExpressionNode = tryToReadAtomicExpression()
    if (atomicExpressionNode) return atomicExpressionNode

    return false
}
