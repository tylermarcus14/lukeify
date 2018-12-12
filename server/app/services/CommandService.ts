const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');

import {Request} from "express";
import {TerminalFilesystem} from "../interfaces/TerminalFilesystem";
import {TerminalState} from "../interfaces/TerminalState";
import {TerminalResponse} from "../interfaces/TerminalResponse";
import {TerminalData} from "../interfaces/TerminalData";

/**
 * Handles user input into the terminal, parsing it, and returning it to the client.
 *
 * @class CommandService
 */
export class CommandService {
    /**
     * The response to be shown to the user when they load the terminal for the first time.
     */
    private onLoadResponse : string = `
        Welcome to lukeify.com.<br/><br/>
        * GitHub:&nbsp;https://github.com/lukeify<br/>
        * Blog:&nbsp;&nbsp;&nbsp;https://blog.lukeify.com<br/>
        * Email:&nbsp;&nbsp;lukedavia@icloud.com<br/>
    `;

    /**
     * The state to utilise when the user loads the terminal for the first time.
     */
    private onLoadState : TerminalState = {
        user: 'visitor@lukeify.com',
        pwd: "/home/visitor",
        alias: "~"
    };

    /**
     * List of commands available to the user.
     */
    private commands = {
        caffeinate: ["-t"],
        //cal: [""],
        cat: ["file"],
        cd: ["[dir]"],
        clear: [""],
        date: [""],
        dotnet: [""],
        //exit: [""],
        help: [""],
        //file: ["[file]"],
        git: [""],
        //id: [""],
        //less: [""],
        //logout: [""],
        ls: [""],
        man: ["name"],
        mail: [""],
        //mkdir: ["dir"],
        //mv: ["[dir or file] [dir or file]"],
        node: ["[-v | --version]"],
        ng: [""],
        npm: [""],
        php: [""],
        pwd: [""],
        python: [""],
        python3: [""],
        //rm: ["[-rf] [--no-preserve-root] file ..."],
        reset: [""],
        rustc: [""],
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
            // Then update the response to build a response
            output = await this.commandFns[parsedEntry.command](req, parsedEntry);

        // If what was entered was a blank entry, just display the previous state with no response.
        } else if (parsedEntry.command === "") {
            output = {
                beforeHook: [],
                afterHook: [],
                response: null,
                state: req.body.state
            };

        // If the command was not valid, return the same context and simply state the command was not found.
        } else {
            output = {
                beforeHook: [],
                afterHook: [],
                response: parsedEntry.command + ": command not found",
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
        caffeinate: async (req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> => {
            return {
                beforeHook: [],
                afterHook: [],
                response: "☕️",
                state: req.body.state
            }
        },

        /**
         * Displays the output of a file or files to the terminal.
         * TODO: Handle stripping last slash off directory
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        cat: async (req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> => {

            const fileName = parsedEntry.options[0];
            console.log(parsedEntry);
            const workingDirectory = this.fsFns.getWorkingDirectory(req.body.fs);
            const potentialFile = (workingDirectory.data as TerminalFilesystem[]).find(e => e.name === fileName);
            let stmt;

            if (potentialFile == null) {
                stmt = `cat: ${fileName}: No such file or directory`;

            } else if (potentialFile.type === "dir") {
                stmt = `cat: ${fileName}: Is a directory`;

            } else if (potentialFile.type === "file") {
                stmt = potentialFile.data;
            }

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            }
        },

        /**
         * TODO:
         * 5. Handle ~ (go home).
         * 6. Handle blank (go home).
         * 7. Handle `/` (go to root).
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        cd: async (req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> => {

            let response : TerminalResponse = {
                beforeHook: [],
                afterHook: [],
                response: null,
                state: req.body.state
            };

            try {
                response.fs         = this.fsFns.setWorkingDirectory(req.body.fs, parsedEntry.options[0] as string);
                response.state      = {...req.body.state, ...this.fsFns.getPwdAndAlias(response.fs)};
            } catch (e) {
                response.response = "cd: " + e.message;
            }

            return response;
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
            };
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

        dotnet: function(req: Request, parsedEntry: TerminalData): TerminalResponse {
            const stmt = "";

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            }
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
         * TODO: format time properly, add additions & deletions counts.
         *
         * `git` shall return my last commit and a short statement about my use of github.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        git: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            let githubDetails: any = await new Promise((resolve, reject) => {
                fs.readFile(path.join(__dirname, "../../cached/github.json"), 'utf8', (err, data) => {
                    if (err) return reject(err);
                    return resolve(JSON.parse(data));
                });
            });

            let stmt = `My last commit was <a href="${githubDetails.commit.url}" target="_blank">${githubDetails.sha.substr(0, 7)}</a> 
                        to <a href="https://github.com/${githubDetails.repoName}" target="_blank">${githubDetails.repoName}</a> on 
                        ${githubDetails.createdAt}:<br><br>"${githubDetails.commit.message}"<br><br>`;

            stmt += 'You can view some of my work at <a href="https://github.com/lukeify" target="_blank">https://github.com/lukeify</a>.';

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
            const stmt = `
                Welcome to lukeify.com. This terminal emulator was created to demonstrate my work in a unique & interesting way. 
                Only basic commands are implemented—and many quality of life additions you've probably come to expect 
                in your own cli environment aren't available here.<br/><br/>
                
                That being said, try to navigate around the virtual filesystem I've created with \`ls\` and \`cd\`. Commands
                such as \`git\`, \`php\`, and \`dotnet\` show what I've built and how I'm using these tools.<br/><br/>
                
                There's some other cool commands implemented also; but they're up to you to find. Have fun! 🚀
            `

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
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
         * TODO: Allow for `-l` option, allow for `-a` option.
         *
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        ls: async (req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> => {

            const pwdFs = this.fsFns.getWorkingDirectory(req.body.fs);

            let stmt = "";

            // Sort the entries so that directories appear first.
            (<TerminalFilesystem[]>pwdFs.data).sort((a,b) => {
                if ((a.type === "dir" && b.type === "dir") || (a.type !== "dir" && b.type !== "dir")) {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                }

                if (a.type === "dir" && b.type !== "dir") { return -1; }
                return 1;
            });

            // Format each entry into a grid of up to 3 columns.
            (<TerminalFilesystem[]>pwdFs.data).forEach((e,i) => {
                stmt += e.name;
                for (let j = 0; j < 25 - e.name.length; j++) {
                    stmt += "&nbsp;";
                }
                if ((i+1) % 3 === 0 && i < pwdFs.data.length - 1) {
                    stmt += "<br/>";
                }
            });

            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
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
        node: function(req: Request, parsedEntry: TerminalData) : TerminalResponse {
            let stmt;
            if (false /*parsedEntry.options.includes("-v")*/) {
                stmt = "v11.3.0";
            } else {
                stmt = `I ❤️ Node! Some of the projects where I've used Node include:<br/><br/>
                        * This website!<br/>
                        *`;
            }
            return {
                beforeHook: [],
                afterHook: [],
                response: stmt,
                state: req.body.state
            }
        },

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
         * Display information about my work in PHP.
         *
         * @param {Request} req - The request object containing the command sent to the server.
         * @param {TerminalData} parsedEntry - The user input, broken into a raw string, the command, and any parameters as an array.
         *
         * @returns {Promise<TerminalResponse>} - The response issued by the terminal for the command given.
         */
        php: async function(req: Request, parsedEntry: TerminalData) : Promise<TerminalResponse> {
            return {
                beforeHook: [],
                afterHook: [],
                response: `spacexstats, my first large personal project, utilised the Laravel 4 framework running PHP5.5. 
                Since then, PHP has come a long way, and I've used to build a few API wrappers, and also professionally`,
                state: req.body.state
            };
        },

        /**
         * Display the current working directory.
         * TODO: 1. Handle pwd at `/`.
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
         * TODO: keep pwd on reset
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
        }
    };

    private fsFns = {

        /**
         * Retrieves the active node of the virtualised filesystem by iterating down to it and returning it. Because it is
         * passed by reference, alterations to the returned `fs` will also affect `rootFs`, as intended.
         *
         * @param rootFs {TerminalFilesystem} - The virtualised filesystem from the root.
         *
         * @return {TerminalFilesystem} A subset of the filesystem from the current working directory.
         */
        getWorkingDirectory: function(rootFs: TerminalFilesystem): TerminalFilesystem {
            let setOfNodes = [];
            setOfNodes.push(rootFs);

            while (setOfNodes.length > 0) {
                let fsAtNode = setOfNodes.shift();

                if (fsAtNode.isPwd) {
                    return fsAtNode;
                }

                let fsChildNodes = (<TerminalFilesystem[]>fsAtNode.data).filter(e => e.type === "dir");
                setOfNodes = setOfNodes.concat(fsChildNodes);
            }

            throw new Error(`Working directory not found.`);
        },

        /**
         * Retrieves the parent of the active node in the virtualised filesystem by iterating down to it and returning it.
         * Because it is passed by reference, alterations to the returned `fs` will also affect `rootFs`, as intended.
         *
         * As there can be no parent directory for root (`/`), null is returned in this case.
         *
         * @param rootFs {TerminalFilesystem} - The virtualised filesystem from the root.
         *
         * @returns {TerminalFilesystem|null} A subset of the filesystem from the parent working directory.
         */
        getParentDirectory: function(rootFs: TerminalFilesystem): TerminalFilesystem|null {
            // If the root of the filesystem is the pwd, return null.
            if (rootFs.isPwd) {
                return null;
            }

            let setOfNodes = [];
            setOfNodes.push(rootFs);

            while (setOfNodes.length > 0) {
                let fsAtNode = setOfNodes.shift();

                let fsChildNodes : TerminalFilesystem[] = (<TerminalFilesystem[]>fsAtNode.data).filter(e => e.type === "dir");

                for (let fsChildNode of fsChildNodes) {
                    if (fsChildNode.isPwd) {
                        return fsAtNode;
                    }
                }
                setOfNodes = setOfNodes.concat(fsChildNodes);
            }

            throw new Error(`Parent directory not found.`);
        },

        /**
         * Retrieves a directory by pwd.
         *
         * @param rootFs {TerminalFilesystem} - The virtualised filesystem from the root.
         *
         * @returns {TerminalFilesystem|null} A subset of the filesystem from the pwd, or null if not found.
         */
        getDirectoryByPwd: function(rootFs: TerminalFilesystem, pwd: string) : TerminalFilesystem|null {
            let fs = rootFs;

            while (fs.name !== "visitor") {
                fs = fs
            }

            return null;
        },

        /**
         * Retrieves the current pwd and alias, given a TerminalFilesystem.
         *
         * @param {TerminalFilesystem} rootFs - The file system to return the pwd and alias for.
         *
         * @return {{ pwd: string; alias: string;}}
         */
        getPwdAndAlias: function(rootFs: TerminalFilesystem) : { pwd: string; alias: string;} {
            let setOfNodes = [];
            setOfNodes.push({
                path: "",
                alias: rootFs.aliases[0],
                fs: rootFs
            });

            while (setOfNodes.length > 0) {
                let fsNodeData = setOfNodes.shift();

                if (fsNodeData.fs.isPwd) {
                    return {
                        pwd: fsNodeData.path,
                        alias: fsNodeData.alias
                    }
                }

                let fsChildNodes = (<TerminalFilesystem[]>fsNodeData.fs.data).filter(e => e.type === "dir").map(e => {
                    return {
                        path: fsNodeData.path + "/" + e.name,
                        alias: e.aliases ? e.aliases[0] : null,
                        fs: e
                    };
                });
                setOfNodes = setOfNodes.concat(fsChildNodes);
            }

            throw new Error(`Pwd & alias not found.`);
        },

        /**
         * Sets the new active working directory of the virtualised filesystem by updating the `isPwd` flag to true for the
         * new active working directory.
         *
         * @param {TerminalFilesystem} rootFs - The file system being manipulated.
         * @param {string} goto - The new working directory being asked to navigate towards.
         *
         * @returns {TerminalFilesystem} The original filesystem with the changed pwd.
         */
        setWorkingDirectory: function(rootFs: TerminalFilesystem, goto: string) : TerminalFilesystem {
            let fs;

            // attempt to navigate towards the goto. If the goto ends with a `/`, split that off first.
            let gotoSegments = goto.endsWith("/") ? goto.substring(0, goto.length - 1).split("/") : goto.split("/");

            // foreach segment of the goto...
            for (let segment of gotoSegments) {
                // referring to the current dir, do nothing
                if (segment === ".") {
                    continue;

                // attempt navigate up a directory
                } else if (segment === "..") {
                    // Unset the current working directory
                    let workingFs = this.getWorkingDirectory(rootFs);
                    let parentFs = this.getParentDirectory(rootFs);

                    if (parentFs !== null) {
                        workingFs.isPwd = false;
                        parentFs.isPwd = true;
                    } else {
                        continue;
                    }

                // navigate home
                } else if (segment === "~") {
                    continue;

                // navigate to root
                } else if (segment === "") {


                // attempt to navigate down a directory. If the attempt fails, revert.
                } else {
                    fs = this.getWorkingDirectory(rootFs);
                    fs.isPwd = false;
                    const potentialNewDir = fs.data.find(e => e.name === segment);

                    // Catch if the file or dir does not exist
                    if (potentialNewDir == null) {
                        throw new Error(goto + ": No such file or directory");
                    }

                    // Catch if the type is not a dir
                    if (potentialNewDir.type !== "dir") {
                        throw new Error(goto + ": Not a directory");
                    }

                    potentialNewDir.isPwd = true;
                }
            }
            return rootFs;
        },

        getFileInWorkingDirectory() {}
    };
}
