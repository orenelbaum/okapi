import { NodeType } from './node-type.enum';
import { AstNode } from './node.type';
import { BlockNode } from '../grammar/block/block-node';
import { ExpressionNode } from '../grammar/expression/expression-node.type';
import { BinaryExpressionNode } from '../grammar/expression/binary-expression/binary-expression-node.interface';
import { IdentifierNode } from '../grammar/identifier/identifier-node.interface';
import { IntNode } from '../grammar/number/int/int-node.interface';
import { VariableDeclarationNode } from '../grammar/variable-declaration/variable-declaration-node.interface';
import { AtomicExpressionNode } from '../grammar/expression/atomic-expression/atomic-expression-node.type';


type NodePrototypesBaseType = {
    [nodeType in NodeType]: AstNode
}

export interface NodePrototypes extends NodePrototypesBaseType {
    // [NodeType.atomicExpression]: AtomicExpressionNode
    [NodeType.binaryExpression]: BinaryExpressionNode
    [NodeType.block]: BlockNode
    [NodeType.identifier]: IdentifierNode
    [NodeType.int]: IntNode
    [NodeType.variableDeclaration]: VariableDeclarationNode
}