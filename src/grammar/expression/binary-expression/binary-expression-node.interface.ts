import { NodeType } from "../../../node/node-type.enum"
import { NodePrototype } from "../../../node/node-prototype.base-interface"
// import { OperatorNode } from "../../operator/operator-node.interface"
import { ExpressionNode } from "../expression-node.type"
import { OperatorType } from "../../operator/operator-type.enum"
import { AtomicExpressionNode } from "../atomic-expression/atomic-expression-node.type"

export interface BinaryExpressionNode extends NodePrototype {
	nodeType: NodeType.binaryExpression
	operatorType: OperatorType
	children: {
		left: ExpressionNode
		right: ExpressionNode
	}
}

export type BinaryExpressionNodeFactory = 
	(args: { operatorType: OperatorType } & BinaryExpressionNode["children"]) => BinaryExpressionNode

export const createBinaryExpressionNode: BinaryExpressionNodeFactory = 
	({ operatorType, ...children }) =>
		({
			nodeType: NodeType.binaryExpression,
			operatorType,
			children
		}) as BinaryExpressionNode