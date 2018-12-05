const superagent = require('superagent');
const uuidv4 = require('uuid/v4');
import {TerminalState} from "../interfaces/TerminalState";
import {TerminalResponse} from "../interfaces/TerminalResponse";
// import {TerminalOption} from "../interfaces/TerminalOption";
import {Request} from "express";
import {TerminalData} from "../interfaces/TerminalData";
// import {CommandSynopsisRecursiveDescentParser} from "./CommandSynopsisRecursiveDescentParser";

/**
 * Handles user input into the terminal, parsing it, and returning it to the client.
 *
 * @class CommandService
 */
export class CommandService {
    private onLoadResponse : string = "Welcome to lukeify.com.<br/><br/>* GitHub:&nbsp;https://github.com/lukeify<br/>* Blog:&nbsp;&nbsp;&nbsp;https://blog.lukeify.com<br/>* Email:&nbsp;&nbsp;lukedavia@icloud.com<br/><br/>";

    private onLoadState : TerminalState = {
        user: 'visitor@lukeify.com',
        pwd: "/home/visitor",
        alias: "~"
    };

    private commands = {
        caffeinate: ["-t"],
        //cal: [""],
        //cat: ["file ..."],
        //cd: ["[dir]"],
        clear: [""],
        date: [""],
        //exit: [""],
        //help: [""],
        //file: ["[file]"],
        git: [""],
        //id: [""],
        //less: [""],
        //logout: [""],
        ls: [""],
        man: ["name"],
        //mkdir: ["dir"],
        //mv: ["[dir or file] [dir or file]"],
        //node: ["[-v | --version]"],
        npm: [""],
        //php: [""],
        pwd: [""],
        //python: [""],
        //python3: [""],
        //rm: ["[-rf] [--no-preserve-root] file ..."],
        reset: [""],
        //tail: ["file ..."],
        uname: [""],
        uuidgen: [""],
        whoami: [""],
        //yarn: [""]
    };

    constructor() {}

    /**
     * Returns the initial terminal configuration to display to the user when the page is first loaded.
     *
     * @returns {TerminalResponse} - The terminal configuration to be displayed on page load.
     */
    public initialTerminalConfiguration() : TerminalResponse {
        return {
            beforeHook: [],
            afterHook: [],
            response: this.onLoadResponse,
            state: this.onLoadState
        };
    }

    /**
     * Executes the command entered by the user.
     *
     * @param {Request} req - The request object containing the command sent to the server.
     *
     * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
     */
    public async execute(req: Request) : Promise<TerminalResponse> {
        // Parse the command
        const parsedEntry: TerminalData = this.helperFns.parseCommand(req.body.entry);

        // If the command is valid
        let output;

        // If the command is available to the user.
        if (this.commands.hasOwnProperty(parsedEntry.command)) {

            // Make a dynamic call to the function hosting the command, passing in the request object, the request context object, and the input object.
            output = await this.commandFns[parsedEntry.command](req, parsedEntry);

            // Update the response to build a response
            output.response = this.helperFns.buildResult(req.body.state, req.body.entry, output.response);

        // If what was entered was a blank entry, just display the
        } else if (parsedEntry.command === "") {
            output = {
                beforeHook: [],
                afterHook: [],
                response: this.helperFns.buildResult(req.body.state, req.body.entry),
                state: req.body.state
            };

        // If the command was not valid, return the same context and simply state the command was not found.
        } else {
            output = {
                beforeHook: [],
                afterHook: [],
                response: this.helperFns.buildResult(req.body.state, req.body.entry, parsedEntry.command + ": command not found"),
                state: req.body.state
            };
        }

        // Return a result
        return output;
    }

    /**
     *
     */
    private commandFns = {
        /**
         * TODO: Randomize responses, add in -t option.
         *
         * Caffeinate.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        caffeinate: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "☕️",
                state: req.body.state
            }
        },

        /**
         * Displays the output of a file or files to the terminal.
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        cat: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse|void> {

            /*let stmts = [];
            input.operands.forEach(param => {
                stmts.push("cat: " + param  + ": No such file or directory");
            });
            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            }*/
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        cd: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            }
        },

        /**
         * Displays a calendar.
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        cal: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const date = new Date();

            const days = 'Su Mo Tu We Th Fr Sa';
            const monthAndYear = `${months[date.getMonth()]} ${date.getFullYear()}`;

            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            }
        },

        /**
         * Clears the terminal window by removing the terminal history. Does not reset the context of the terminal.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        clear: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: ["clear"],
                response: "",
                state: req.body.state
            }
        },

        /**
         * TODO: Add public holidays.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        date: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {

            const date = new Date();

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const h = date.getHours().toString().padStart(2, "0");
            const m = date.getMinutes().toString().padStart(2, "0");
            const s = date.getSeconds().toString().padStart(2, "0");
            const tz = date.getTimezoneOffset() === 720 ? "NZST" : "NZDT";

            let stmt = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${h}:${m}:${s} ${tz}`;

            if (date.getHours() <= 6 || date.getHours() >= 22) {
                stmt += ". It's nighttime. I'm probably sleeping.";
            } else if (date.getDay() === 0 || date.getDay() === 6) {
                stmt += ". It's a weekend. I'm probably paragliding/hiking/relaxing.";
            } else if (date.getHours() > 6 && date.getHours() < 17) {
                stmt += ". I'm probably working.";
            } else {
                stmt += ". It's the best time to contact me!";
            }

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            };
        },

        /**
         * Feigns an `exit`. On the frontend of the application, show the response, before removing the terminal.
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        /*exit: function(req: Request, parsedEntry: TerminalData) : TerminalResponse {
            const stmt = "logout<br/>Saving session...<br/>...copying shared history...<br/>...saving history...truncating history files...<br/>...completed.<br/>";
            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: "[Process completed]"
            }
        },*/

        /**
         * TODO: format time properly, add additions & deletions counts, and cache results on server.
         *
         * `git` shall return my last commit and a short statement about my use of github.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        git: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            let stmt = '';

            try {
                const eventRes = await superagent.get('https://api.github.com/users/lukeify/events');
                const pushEvent = eventRes.body.find(event => event.type === "PushEvent");

                const commitRes = await superagent.get(pushEvent.payload.commits[0].url);
                const commit = commitRes.body;


                stmt = `My last commit was <a href="${commit.html_url}" target="_blank">${commit.sha.substr(0, 7)}</a> 
                        to <a href="https://github.com/${pushEvent.repo.name}" target="_blank">${pushEvent.repo.name}</a> on 
                        ${pushEvent.created_at}:<br><br>"${commit.commit.message}"<br><br>`;

            } catch (e) {
                console.log(e);
            }

            stmt += 'You can view some of my work on at <a href="https://github.com/lukeify" target="_blank">https://github.com/lukeify</a>.';

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            }
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        help: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            };
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        id: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            };
        },

        /**
         * Shortcut for `ls`.
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        l: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            };
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        logout: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            };
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        ls: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {



            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            };
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        man: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            const stmt = "Trying to find out what's available huh? This terminal was designed in about a day as a fun interaction method for who have basic knowledge of a command line interface. Try `date` or `whoami` as an example!<br/><br/>And yes, I did write a terminal mockup in JavaScript. Yes, it communicates over HTTP to retrieve a result. Finally, yes, I know this makes me an evil person. However, if you like what you've seen here and would be interested in hiring me, get in touch at <a href=\"mailto:lukedavia@icloud.com\">lukedavia@icloud.com</a>.<br/>";

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            }
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        /* node: function(req: Request, parsedEntry: TerminalData) : TerminalResponse {
            let stmt;
            if (input.options.includes("-v")) {
                stmt = "v8.9.0";
            } else {
                stmt = "Scroll down the page for a list of projects I've implemented in Node. If you're interested in my expertise in working on a project that runs on Node, give me a holler!";
            }
            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                context: context
            }
        },*/

        /**
         * No discussion about NPM is complete without a reference to Yarn, right?
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        npm: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: `I personally prefer <a href="https://yarnpkg.com">yarnpkg</a>! 🐱`,
                state: req.body.state
            }
        },

        /**
         * Display the current working directory.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        pwd: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: req.body.state.pwd,
                state: req.body.state
            };
        },

        /**
         * Resets the terminal history and context to what is shown on page load.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalState} state - The context of the request being made: the user making the request and the current working directory.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        reset: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: ['reset'],
                response: "",
                state: req.body.state
            };
        },

        /**
         * TODO: Implement
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalState} state - The context of the request being made: the user making the request and the current working directory.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        rm: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            };
        },


        /**
         * Display information about this website.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalState} state - The context of the request being made: the user making the request and the current working directory.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        uname: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "lukeify.com. Utilising Forever.js, Express.js running on Node 10, reverse proxied by NGINX, with a DigitalOcean provided Ubuntu 18.04 VPS.",
                state: req.body.state
            };
        },

        /**
         * Generate a random GUID.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalState} state - The context of the request being made: the user making the request and the current working directory.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        uuidgen: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: uuidv4(),
                state: req.body.state
            };
        },

        /**
         * Overload `whoami` to display the IP address of the visitor.
         * TODO: check it works.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalState} state - The context of the request being made: the user making the request and the current working directory.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        whoami: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "You are a visitor from " + req['ip'] + "!",
                state: req.body.state
            }
        },

        /**
         * TODO: Say something about Yarn package manager!
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalState} state - The context of the request being made: the user making the request and the current working directory.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        yarn: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: "",
                state: req.body.state
            }
        }
    };

    private helperFns = {
        /**
         *
         * @param {TerminalState} state
         * @param {TerminalData} input
         * @param {string|null} toAppend
         *
         * @returns {string}
         */
        buildResult: function(state: TerminalState, input, toAppend = null) : string {
            let trimmedDirOrAlias = state.alias !== null ? state.alias : state.pwd.split("/").pop();

            let result = `<span class="term-color term-sky">${state.user}</span>:<span class="term-color term-red">${trimmedDirOrAlias}</span>$&nbsp;${input}<br/>`;
            if (toAppend) {
                result += `${toAppend}<br/>`;
            }
            return result;
        },

        /**
         * For the user input, trip the data to remove any whitespace on either side. Begin by pulling off the command, defined
         * as the first element that can be split off on whitespace. From there, break any remaining values into options and parameters.
         *
         * Options are defined as single letters preceded by a `-`. Options can be "ganged", that is, grouped without spaces and preceded
         * by a single `-`. This cover most options for UNIX utilities.
         *
         * Arguments are defined as standalone strings of characters with no whitespace separation.
         *
         * @param {string} input - The user entered input.
         *
         * @returns {TerminalData}
         */
        parseCommand: function(input: string) : TerminalData {
            const trimmedInput : string = input.trim();
            const command : string =  trimmedInput.split(" ").shift();

            // Temporary solution to grab user-entered options before we implement a full RDP.
            const options: string[] = trimmedInput.split(" ").slice(1);

            //const synopsis : string[] = this.commandSynopses[command];
            //CommandSynopsisRecursiveDescentParser.run(command, synopsis, trimmedInput);

            return {
                command: command,
                options: options,
                operands: []
            }
        },

        /**
         * For a given current working directory, and a path that may be relative or absolute, retrieve any data that may be present at that node.
         * If no data is present, or the node could not be navigated to completely, throw exception.
         *
         * @param {any} fs - The file system being manipulated.
         * @param {string} pwd -
         * @param {string} goto -
         *
         * @returns {any} A node in the virtualised filesystem
         */
        navigateTo: function(fs: any, pwd: string, goto: string) : any {
            let segments = pwd.split("/");
            for (let segment in segments) {
                if (!fs.hasOwnProperty('data') || !Array.isArray(fs.data)) {
                    throw new Error(`${pwd} is not valid`);
                }
                //fs.data.find(d => d.)
            }
        },

        /**
         * For a given cwd, and a goto, return the new pwd. If the goto is invalid, returns the current working directory.
         *
         * @param {string} cwd -
         * @param {string} goto -
         *
         * @return {string}
         */
        getNewPwd: function(fs: any, pwd: string, goto: string) : string {
            return null;
        }
    };
}
