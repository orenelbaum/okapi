import { getCurrentToken } from '../../../tygon-code-to-ast/parsing/parsing-context';
import { createIdentifierNode } from '../../identifier/identifier-node.interface';
import { createIntNode } from '../../number/int/int-node.interface';


export function tryToReadAtomicExpression() {
    const token = getCurrentToken()
    if (!token) return false
    
    if (token.type === "identifier") return createIdentifierNode({ name: token.name as string })
    
    if (token.type === "int") return createIntNode({ value: token.value })
    
    return false
}