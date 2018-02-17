import {TerminalOption} from "./TerminalOption";
import {TerminalOperand} from "./TerminalOperand";

export interface TerminalCommandData {
    command: string;
    options: TerminalOption[];
    operands: TerminalOperand[];
}