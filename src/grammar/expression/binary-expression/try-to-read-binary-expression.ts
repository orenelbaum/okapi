import { tryToReadExpression } from '../try-to-read-expression';
import { getCurrentTokenizedLine, parsingContext, goToNextColumn } from '../../../tygon-code-to-ast/parsing/parsing-context';
import { isBinaryOperatorToken } from '../../operator/binary-operator/is-binary-operator-token.type-guard';
import { ExpressionNode } from '../expression-node.type';
import { createBinaryExpressionNode } from './binary-expression-node.interface';
import { OperatorType } from '../../operator/operator-type.enum';
import { tryToReadAtomicExpression } from '../atomic-expression/try-to-read-atomic-expression';


export function tryToReadBinaryExpression() {
    const leftAtomicExpressionNode = tryToReadAtomicExpression()
    if (!leftAtomicExpressionNode) return false

    // Try to read binary operator
    const binaryOperatorToken = getCurrentTokenizedLine().tokens[parsingContext.currentColumnIndex + 1]
    if (!binaryOperatorToken || !isBinaryOperatorToken(binaryOperatorToken)) return false

    goToNextColumn()
    goToNextColumn()

    const rightExpressionNode = tryToReadExpression() as ExpressionNode
    if (!rightExpressionNode) throw new Error("Invalid binary expression.")

    return createBinaryExpressionNode({
        left: leftAtomicExpressionNode,
        operatorType: binaryOperatorToken.operatorType as OperatorType,
        right: rightExpressionNode
    })
}