import { NodeType } from "./node-type.enum"
import { AstNode } from "./node.type"


export function nodeIsNodeType<T extends NodeType>(
	node: AstNode,
	nodeType: T
): node is AstNode & { nodeType: T } {
	return node.nodeType === nodeType
}
