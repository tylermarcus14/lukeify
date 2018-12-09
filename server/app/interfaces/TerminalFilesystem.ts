export interface TerminalFilesystem {
    type: string;
    isPwd?: boolean;
    aliases?: string[];
    name: string;
    data: string|TerminalFilesystem[];
}
