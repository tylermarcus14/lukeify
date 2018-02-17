import {TerminalContextData} from "./TerminalContextData";

export interface TerminalCommandRequest {
    context: TerminalContextData;
    command: string;
}