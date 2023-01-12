import { NodeChildren } from "./node-children.interface"
import { NodePrototype } from "./node-prototype.base-interface"
import { NodeType } from "./node-type.enum"

export function nodeFactory(nodeType: NodeType, children?: NodeChildren) {
	return {
		nodeType,
		children,
	} as NodePrototype
}
