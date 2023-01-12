import { IntNode, tokenizeIntNode } from "../../number/int/int-node.interface"
import { IdentifierNode, tokenizeIdentifierNode } from "../../identifier/identifier-node.interface"
import { NodeType } from "../../../node/node-type.enum"

export type AtomicExpressionNode = IntNode | IdentifierNode

export const tokenizeAtomicExpressionNode = 
    ({ atomicExpressionNode }: { atomicExpressionNode: AtomicExpressionNode }) => {
        if (atomicExpressionNode.nodeType === NodeType.int)
            return tokenizeIntNode({ intNode: atomicExpressionNode })
        else return tokenizeIdentifierNode({ identifierNode: atomicExpressionNode })
    }