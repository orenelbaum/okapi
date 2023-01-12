import { BinaryExpressionNode } from './binary-expression-node.interface';
import { Token } from '../../../tygon-code-to-ast/tokenization/token.interface';
import { tokenizeExpressionNode } from '../tokenize-expression-node';
import { tokenizeOperatorNode } from '../../operator/tokenize-operator-node';


export type TokenizeBinaryExpressionNode = 
    ({ binaryExpressionNode }: { binaryExpressionNode: BinaryExpressionNode }) => Token[]

export const tokenizeBinaryExpressionNode: TokenizeBinaryExpressionNode =
    ({ binaryExpressionNode }) =>
        [
            ...tokenizeExpressionNode({ expressionNode: binaryExpressionNode.children.left }),
            tokenizeOperatorNode({ operatorType: binaryExpressionNode.operatorType }),
            ...tokenizeExpressionNode({ expressionNode: binaryExpressionNode.children.right })
        ]