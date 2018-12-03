export interface TerminalOption {
    metadata: {
        name: string;
        isOptional: boolean;
        hasArgument: TerminalOptionArgumentValidity;
        groupedWith: string[];
        duplicatesAllowed: boolean;
    }
    exists: boolean;
    argument: string|string[]|null;
}