import {TerminalState} from "./TerminalState";

export interface TerminalRequest {
    context: TerminalState;
    command: string;
    fs?: any;
}
