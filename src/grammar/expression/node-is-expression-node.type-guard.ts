import { NodeType } from "../../node/node-type.enum"
import { AstNode } from "../../node/node.type"
import { ExpressionNode } from "./expression-node.type"

export function nodeIsExpressionNode(node: AstNode): node is ExpressionNode {
	return (
		node.nodeType === NodeType.binaryExpression ||
		// node.nodeType === NodeType.callExpression ||
		node.nodeType === NodeType.int ||
		node.nodeType === NodeType.identifier ||
		node.nodeType === NodeType.variableDeclaration ||
        node.nodeType === NodeType.block
	)
}
