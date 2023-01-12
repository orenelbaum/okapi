import { parsingContext } from '../tygon-code-to-ast/parsing/parsing-context';
import { getCurrentIndentationLevel } from '../js-ast-to-code/ast-tokenization/tokenization-context';

export const logPosition = () => console.log({
    line: parsingContext.currentLineIndex,
    column: parsingContext.currentColumnIndex,
    indentationLevel: getCurrentIndentationLevel()
})

export const log = (...thing: any) => {
    logPosition()
    console.log("=> ", ...thing)
}