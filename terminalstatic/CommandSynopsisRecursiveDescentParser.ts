
/**
 * GRAMMAR:
 *
 * <Synopsis>                               ::= <OptionFragments> <OperandFragments>
 * <OptionFragments>                        ::= <OptionData> | <OptionData> <OptionFragments> | <ModifiedOptionData> | <ModifiedOptionData> <OptionFragments>
 * <OperandFragments>                       ::= <Operand> | <Operand> <OperandFragments>
 *
 * <ModifiedOptionData>                     ::= "(" <MutualExclusions> ")" | "[" "(" MutualExclusions ")" "]" | "[" <OptionData> "]"
 * <OptionData>                             ::= <GNUOption> | <GNUOptionWithArg> | <UnixOption> | <UnixOptionsGrouped> | <UnixOptionWithArg> |  <UnixOptionWithOptionalArg>
 *
 * <MutualExclusions>                       ::= <OptionData> "|" <OptionData> | <OptionData> "|" <MutualExclusions>
 *
 * <UnixOption>                             ::= "-" <Char>
 * <UnixOptionsGrouped>                     ::= "-" <Chars>
 * <UnixOptionWithArg>                      ::= <UnixOption> " " <Chars>
 * <UnixOptionWithOptionalArg>              ::= <UnixOption> "[" <Chars> "]" | <UnixOption> " " "[" <Chars> "]"
 * <GNUOption>                              ::= "-" "-" <Chars>
 * <GNUOptionWithArg>                       ::= <GNUOption> "=" <Chars>
 * <GNUOptionWithOptionalArg>               ::= <GNUOption> "[" "=" <Chars> "]" | <GNUOption> " " "[" "=" <Chars> "]"
 *
 * <Operand>                                ::= <Chars> | "[" <Chars> "]" | <Chars> <Ellipses> | <Chars> " " <Ellipses> | "[" <Chars> <Ellipses> "]" | "[" <Chars> " " <Ellipses> "]"
 *
 * <Chars>                                  ::= <Char> | <Char> <Chars>
 * <Char>                                   ::= [^\s]
 * <Ellipses>                               ::= "." "." "."
 *
 * @class
 */

export class CommandSynopsisRecursiveDescentParser {
    private datastructure = {};
    private index : number = 0;

    constructor(public command: string, public synopsis: string) {

    }

    /**
     *
     * @returns {any}
     */
    public parse() : any {

        return this.datastructure;
    }

    /**
     * <Ellipses> ::= "." "." "."
     *
     * @returns {boolean}
     */
    private parseEllipses() : boolean {
        return this.synopsis.substr(this.index, 3) === "...";
    }
}