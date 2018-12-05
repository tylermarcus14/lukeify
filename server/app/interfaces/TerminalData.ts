import {TerminalOption} from "./TerminalOption";
import {TerminalOperand} from "./TerminalOperand";

export interface TerminalData {
    command: string;
    options: TerminalOption[]|string[];
    operands: TerminalOperand[];
}
