import { BlockNode } from "../block/block-node"
import { VariableDeclarationNode } from "../variable-declaration/variable-declaration-node.interface"
import { AtomicExpressionNode } from "./atomic-expression/atomic-expression-node.type"
import { BinaryExpressionNode } from "./binary-expression/binary-expression-node.interface"
// import { CallExpressionNode } from "./call-expression/call-expression-node.interface"


export type ExpressionNode =
	| AtomicExpressionNode
	| BinaryExpressionNode
	// | CallExpressionNode
	| VariableDeclarationNode
	| BlockNode