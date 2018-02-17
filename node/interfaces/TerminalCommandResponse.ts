import {TerminalContextData} from "./TerminalContextData";

export interface TerminalCommandResponse {
    beforeResponseHistoryAppendHook: string[];
    afterResponseHistoryAppendHook: string[];
    response: string|null;
    context: TerminalContextData;
}