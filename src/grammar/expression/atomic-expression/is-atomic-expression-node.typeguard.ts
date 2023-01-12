import { NodeType } from '../../../node/node-type.enum'
import { ExpressionNode } from '../expression-node.type'
import { AtomicExpressionNode } from './atomic-expression-node.type';


export function isAtomicExpressionNode(expressionNode: ExpressionNode): expressionNode is AtomicExpressionNode {
    return (
        expressionNode.nodeType === NodeType.int
        || expressionNode.nodeType === NodeType.identifier
    )
}