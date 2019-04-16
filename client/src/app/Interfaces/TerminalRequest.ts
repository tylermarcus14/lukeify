import {TerminalState} from './TerminalState';

export interface TerminalRequest {
    state: TerminalState;
    command: string;
    fs: any;
}
