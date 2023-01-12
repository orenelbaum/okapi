import { Token } from '../../tygon-code-to-ast/tokenization/token.interface'
import { VariableDeclarationNode } from './variable-declaration-node.interface'
import { tokenizeExpressionNode } from '../expression/tokenize-expression-node'
import { OperatorType } from '../operator/operator-type.enum'
import { tokenizeOperatorNode } from '../operator/tokenize-operator-node';


export type TokenizeVariableDeclarationNode = 
    ({ variableDeclarationNode }: { variableDeclarationNode: VariableDeclarationNode }) => Token[]

export const tokenizeVariableDeclarationNode: TokenizeVariableDeclarationNode =
    ({ variableDeclarationNode }) =>
        [
            tokenizeOperatorNode({ 
                operatorType: variableDeclarationNode.variableType as unknown as OperatorType 
            }),
            ...tokenizeExpressionNode({ expressionNode: variableDeclarationNode.children.identifier }),
            tokenizeOperatorNode({ operatorType: OperatorType.assignment }),
            ...tokenizeExpressionNode({ expressionNode: variableDeclarationNode.children.init })
        ]