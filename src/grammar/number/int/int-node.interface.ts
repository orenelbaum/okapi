import { LeafNode } from "../../../node/leaf-node.base-type"
import { NodeType } from "../../../node/node-type.enum"
import { Token } from "../../../tygon-code-to-ast/tokenization/token.interface"


export interface IntNode extends LeafNode {
	nodeType: NodeType.int
	value: number
}

export const createIntNode = 
	({ value }: { value: number }) =>
		({
			nodeType: NodeType.int,
			value
		}) as IntNode

export const tokenizeIntNode = 
	({ intNode }: { intNode: IntNode }) => 
		({ 
			type: "int", 
			value: intNode.value 
		}) as Token