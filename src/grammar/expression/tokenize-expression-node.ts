import { NodeType } from '../../node/node-type.enum';
import { tokenizeIntNode } from "../number/int/int-node.interface";
import { tokenizeIdentifierNode } from '../identifier/identifier-node.interface';
import { ExpressionNode } from './expression-node.type';
import { tokenizeBinaryExpressionNode } from './binary-expression/tokenize-binary-expression-node';
import { tokenizeVariableDeclarationNode } from '../variable-declaration/tokenize-variable-declaration-node';


export function tokenizeExpressionNode({ expressionNode }: { expressionNode: ExpressionNode }) {
	if (expressionNode.nodeType === NodeType.int)
		return [tokenizeIntNode({ intNode: expressionNode })]
	
	else if (expressionNode.nodeType === NodeType.identifier)
		return [tokenizeIdentifierNode({ identifierNode: expressionNode })]
	
	else if (expressionNode.nodeType === NodeType.binaryExpression)
		return tokenizeBinaryExpressionNode({ binaryExpressionNode: expressionNode })

	else if (expressionNode.nodeType === NodeType.variableDeclaration)
		return tokenizeVariableDeclarationNode({ variableDeclarationNode: expressionNode })
	
	else throw new Error("Invalid expression node.")
}