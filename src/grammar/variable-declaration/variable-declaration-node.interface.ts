import { NodeType } from "../../node/node-type.enum"
import { NodePrototype } from "../../node/node-prototype.base-interface"
import { ExpressionNode } from "../expression/expression-node.type"
import { IdentifierNode } from "../identifier/identifier-node.interface"
import { VariableType } from './variable-type.enum';

export interface VariableDeclarationNode extends NodePrototype {
	nodeType: NodeType.variableDeclaration
	variableType: VariableType
	children: {
		identifier: IdentifierNode
		init: ExpressionNode
	}
}

export const createVariableDeclarationNode = ({
	variableType, ...children
}: VariableDeclarationNode["children"] & { variableType: VariableType }) =>
	({
		nodeType: NodeType.variableDeclaration,
		variableType,
		children
	}) as VariableDeclarationNode
