import {TerminalState} from "./TerminalState";

export interface TerminalResponse {
    beforeHook: string[];
    afterHook: string[];
    response: string|null;
    state: TerminalState;
    fs?: any;
}
