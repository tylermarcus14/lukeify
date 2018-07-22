// import {TerminalContextData} from "../interfaces/TerminalContextData";
// import {TerminalCommandResponse} from "../interfaces/TerminalCommandResponse";
// import {TerminalOption} from "../interfaces/TerminalOption";
// import {Express} from "express";
// import {TerminalCommandData} from "../interfaces/TerminalCommandData";
// import {CommandSynopsisRecursiveDescentParser} from "./CommandSynopsisRecursiveDescentParser";
//
// /**
//  * Handles user input into the terminal, parsing it, and returning it to the client.
//  *
//  * @class CommandService
//  */
// export class CommandService {
//     private onLoadResponse : string = "Welcome to lukeify.com.<br/><br/>* My GitHub:&nbsp;https://github.com/lukeify<br/>* Blog:&nbsp;&nbsp;&nbsp;&nbsp;https://blog.lukeify.com<br/>* Email me:&nbsp;&nbsp;lukedavia@icloud.com<br/><br/>";
//
//     private onLoadContext : TerminalContextData = {
//         user: 'visitor@lukeify.com',
//         pwd: "/home/visitor",
//         alias: "~"
//     };
//
//     private commands : string[] = ['cat','cd','clear','date','exit','help','file','git','id','l','less','logout','ls','man','node','npm','pwd','rm','reset','tail','whoami','youtube-dl'];
//
//     private commandSynopses = {
//         cat: ["file ..."],
//         cd: ["[dir]"],
//         clear: [""],
//         date: [""],
//         exit: [""],
//         help: [""],
//         file: ["[file]"],
//         git: [""],
//         id: [""],
//         less: [""],
//         logout: [""],
//         ls: ["[dir]"],
//         man: ["name"],
//         node: ["[-v | --version]"],
//         npm: [""],
//         pwd: [""],
//         rm: ["[-rf] [--no-preserve-root] file ..."],
//         reset: [""],
//         tail: ["file ..."],
//         whoami: [""],
//         "youtube-dl": [""]
//     };
//
//     /**
//      * Returns the initial terminal configuration to display to the user when the page is first loaded.
//      *
//      * @returns {TerminalCommandResponse} - The terminal configuration to be displayed on page load.
//      */
//     public initialTerminalConfiguration() : TerminalCommandResponse {
//         return {
//             beforeResponseHistoryAppendHook: [],
//             afterResponseHistoryAppendHook: [],
//             response: this.onLoadResponse,
//             context: this.onLoadContext
//         };
//     }
//
//     /**
//      * Executes the command entered by the user.
//      *
//      * @param {Express.Request} req - The request object containing the command sent to the server.
//      *
//      * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//      */
//     public execute(req: Express.Request) : TerminalCommandResponse {
//         // Assign all variables to local constants
//         const context = req.body.context;
//         const entry = req.body.entry;
//         const terminalCommandData = this.helperFns.parseCommand(entry);
//
//         // If the command is valid
//         if (this.commands.includes(terminalCommandData.command)) {
//             // Make a dynamic call to the function hosting the command, passing in the request object, the request context object, and the input object.
//             const result = this.commandFns[terminalCommandData.command](req, context, terminalCommandData);
//
//             // Return the result
//             return {
//                 beforeResponseHistoryAppendHook: result.beforeHooks,
//                 afterResponseHistoryAppendHook: result.afterHooks,
//                 response: result.newHistory,
//                 context: result.newContext
//             };
//
//         } else {
//
//             // If the command was not valid, return the same context and simply state the command was not found.
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.buildResult(context, entry, terminalCommandData.command + ": command not found"),
//                 context: context
//             };
//         }
//     }
//
//     private commandFns = {
//         /**
//          * Displays the output of a file or files to the terminal.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         cat: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//
//             let stmts = [];
//             input.operands.forEach(param => {
//                 stmts.push("cat: " + param  + ": No such file or directory");
//             });
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.buildResult(context, input.raw, stmts.join("<br/>")),
//                 context: context
//             }
//         },
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         cd: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             }
//         },
//         /**
//          * Clears the terminal window by removing the terminal history. Does not reset the context of the terminal.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         clear: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             }
//         },
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         date: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//
//             const stmt = 'It\'s currently 5:25PM in New Zealand. I\'m probably working.';
//
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "date", stmt),
//                 context: context
//             }
//         },
//         /**
//          * Feigns an `exit`. On the frontend of the application, show the response, before removing the terminal.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         exit: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             const stmt = "logout<br/>Saving session...<br/>...copying shared history...<br/>...saving history...truncating history files...<br/>...completed.<br/>";
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "exit", stmt),
//                 context: "[Process completed]"
//             }
//         },
//         /**
//          * `git` shall return my last commit and a short statement about my use of github.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         git: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             const stmt = 'You can view my work on GitHub at <a href="https://github.com/lukeify">https://github.com/lukeify</a>.';
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "git", stmt),
//                 context: context
//             }
//         },
//
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         help: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         id: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          * Shortcut for `ls`.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         l: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         logout: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         ls: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          * Hijack `man` to provide information about me.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         man: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             const stmt = "Trying to find out what's available huh? This terminal was designed in about a day as a fun interaction method for who have basic knowledge of a command line interface. Try `date` or `whoami` as an example!<br/><br/>And yes, I did write a terminal mockup in JavaScript. Yes, it communicates over HTTP to retrieve a result. Finally, yes, I know this makes me an evil person. However, if you like what you've seen here and would be interested in hiring me, get in touch at <a href=\"mailto:lukedavia@icloud.com\">lukedavia@icloud.com</a>.<br/>";
//
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "man", stmt),
//                 context: context
//             }
//         },
//
//         /**
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         node: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             let stmt;
//             if (input.options.includes("-v")) {
//                 stmt = "v8.9.0";
//             } else {
//                 stmt = "Scroll down the page for a list of projects I've implemented in Node. If you're interested in my expertise in working on a project that runs on Node, give me a holler!";
//             }
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "node" + input, stmt),
//                 context: context
//             }
//         },
//
//         /**
//          * No discussion about NPM is complete without a reference to Yarn, right?
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         npm: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             const stmt = 'npm is cool and all, but have you heard of yarn?';
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "npm", stmt),
//                 context: context
//             }
//         },
//
//         /**
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         pwd: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          * Resets the terminal history and context to what is shown on page load.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         reset: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         rm: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: "",
//                 context: context
//             };
//         },
//
//         /**
//          * Overload `whoami` to display the IP address of the visitor.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         whoami: function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             const stmt = "You are a visitor from " + req.ip + "!";
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "whoami", stmt),
//                 context: context
//             }
//         },
//
//         /**
//          * <3 you Jack.
//          *
//          * @param {express.Request} req - The request object containing the command sent to the server.
//          * @param {TerminalContextData} context - The context of the request being made: the user making the request and the current working directory.
//          * @param {TerminalCommandData} input - The user input, broken into a raw string, the command, and any parameters as an array.
//          *
//          * @returns {TerminalCommandResponse} - The response issued by the terminal for the command given.
//          */
//         "youtube-dl": function(req: Express.Request, context: TerminalContextData, input: TerminalCommandData) : TerminalCommandResponse {
//             const stmt = 'Great videos if you\'re a SpaceX Fan: <a href="https://youtube.com/JackL">https://youtube.com/JackL</a>';
//             return {
//                 beforeResponseHistoryAppendHook: [],
//                 afterResponseHistoryAppendHook: [],
//                 response: this.helperFns.appendToHistory(context, "youtube-dl", stmt),
//                 context: context
//             }
//         }
//     };
//
//     private helperFns = {
//         /**
//          *
//          * @param {TerminalContextData} context
//          * @param {TerminalCommandData} input
//          * @param toAppend
//          *
//          * @returns {string}
//          */
//         buildResult: function(context, input, toAppend) : string {
//             let trimmedDirOrAlias = context.alias !== null ? context.alias : context.pwd.split("/").pop();
//             return '<span class="term-color term-sky">' + context.user + '</span>:<span class="term-color term-red">' + trimmedDirOrAlias + '</span>$&nbsp;' + input + "<br/>" + toAppend + "<br/>";
//         },
//
//         /**
//          *
//          * @param {string} input
//          */
//         parseCommandExpectations: function(input: string) {
//
//         },
//
//         /**
//          * For the user input, trip the data to remove any whitespace on either side. Begin by pulling off the command, defined
//          * as the first element that can be split off on whitespace. From there, break any remaining values into options and parameters.
//          *
//          * Options are defined as single letters preceded by a `-`. Options can be "ganged", that is, grouped without spaces and preceded
//          * by a single `-`. This cover most options for UNIX utilities.
//          *
//          * Arguments are defined as standalone strings of characters with no whitespace separation.
//          *
//          * @param {string} input - The user entered input.
//          *
//          * @returns {TerminalCommandData}
//          */
//         parseCommand: function(input: string) : TerminalCommandData {
//             const trimmedInput : string = input.trim();
//             const command : string =  trimmedInput.split(" ").shift();
//
//             const synopsis : string[] = this.commandSynopses[command];
//
//             CommandSynopsisRecursiveDescentParser.run(command, synopsis, trimmedInput);
//
//             return {
//                 command: command,
//                 options: arrayOfEntryData,
//                 operands: [""]
//             }
//         },
//
//         /**
//          * For a given current working directory, and a path that may be relative or absolute, retrieve any data that may be present at that node.
//          * If no data is present, or the node could not be navigated to completely, returns null.
//          *
//          * @param {string} cwd -
//          * @param {string} goto -
//          *
//          * @returns
//          */
//         navigateTo: function(cwd: string, goto: string) : string {
//
//         },
//
//         /**
//          * For a given cwd, and a goto, return the new pwd. If the goto is invalid, returns the current working directory.
//          *
//          * @param {string} cwd -
//          * @param {string} goto -
//          */
//         getNewPwd: function(cwd: string, goto: string) : string {
//
//         }
//     };
// }
