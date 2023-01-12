import { BlockNode, createBlockNode } from './block-node'
import { parsingContext, getCurrentTokenizedLine, getCurrentIndentationLevel, goToNextLine, getCurrentToken, getCurrentBlock, blockStack } from '../../tygon-code-to-ast/parsing/parsing-context';
import { tryToReadExpression } from '../expression/try-to-read-expression';


// export const log = (...thing: any) => {
//     console.log({
//         line: parsingContext.currentLineIndex,
//         column: parsingContext.currentColumnIndex,
//         indentationLevel: getCurrentIndentationLevel()
//     }, "=> ", ...thing)
// }

export function readBlock() {
    const newBlock = createBlockNode({ body: [] })
    blockStack.push(newBlock)

    if (
        !getCurrentTokenizedLine() 
        || getCurrentTokenizedLine().indentationLevel !== getCurrentIndentationLevel()
    )
        throw new Error("Invalid read block invocation.")
    
    readBlockLevelExpression()

    while (shouldReadNextLine()) {
        goToNextLine()
        readBlockLevelExpression()
    }

    if (blockStack.pop() !== newBlock) throw new Error("Internal error: invalid block stack in ast.")
    return newBlock
}

function shouldReadNextLine() {
    const nextTokenizedLine = parsingContext.tokenizedLines[parsingContext.currentLineIndex + 1]

    return (
        nextTokenizedLine
        && (nextTokenizedLine.indentationLevel >= getCurrentIndentationLevel())    
    )
}

// Read an expression which is a direct child of the block (not an inlin expression).
function readBlockLevelExpression() {
    if (!getCurrentToken()) return

    const expressionNode = tryToReadExpression()
    if (!expressionNode) throw new Error(
        `Invalid expression at line ${parsingContext.currentLineIndex}, column ${parsingContext.currentColumnIndex}`
    )

    ;(getCurrentBlock() as BlockNode).children.body.push(expressionNode)
}