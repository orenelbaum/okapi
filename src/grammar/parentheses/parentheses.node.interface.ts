import { NodeType } from "../../node/node-type.enum"

export interface ParenthesesNode {
	type: NodeType.parentheses
	openingOrClosing: "opening" | "closing"
}
