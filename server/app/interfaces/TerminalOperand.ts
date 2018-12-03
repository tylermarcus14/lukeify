export interface TerminalOperand {
    metadata: {
        name: string;
        optional: boolean;
        duplicatesAllowed: boolean;
    }
    exists: boolean;
    value: string|string[]|null;
}