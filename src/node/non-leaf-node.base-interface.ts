import { NodePrototype } from "./node-prototype.base-interface"

export type NonLeafNode = NodePrototype &
	Required<Pick<NodePrototype, "children">>
