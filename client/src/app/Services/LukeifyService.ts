import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Tweet} from "../Interfaces/Tweet";
import {TerminalResponse} from "../Interfaces/TerminalResponse";
import {TerminalState} from "../Interfaces/TerminalState";

/**
 * @class LukeifyService
 */
@Injectable()
export class LukeifyService {

    /**
     * Constructor for LukeifyService.
     *
     * @param {HttpClient} http - The HttpClient used to make requests.
     */
    constructor(public http: HttpClient) {}

    /**
     * Sends a get request to retrieve the cached tweets that are stored on my server.
     *
     * @returns {Observable<Tweet[]>} - An array of tweets.
     */
    public getTweets() : Observable<Tweet[]> {
        return this.http.get<Tweet[]>('/api/tweets');
    }

    /**
     * Sends a get request to retrieved the cached instagram photos that are stored on my server.
     *
     * @returns {Observable<any>}
     */
    public getInstas(): Observable<any> {
        return this.http.get<any>('/api/instas');
    }

    /**
     * Sends up a command and some state information to the server which returns a terminal snapshot.
     *
     * @param {TerminalState} state - The state, i.e. directory from which the command is being executed.
     * @param {string} entry - The entry being executed (i.e. the full user input containing the command and the parameters if any).
     * @param {any} fs - The current filesystem state the user is interacting with.
     *
     * @returns {Observable<TerminalSnapshot>} The next terminal configuration.
     */
    public getCommand(state: TerminalState, entry: string, fs: any) : Observable<TerminalResponse> {
        return this.http.post<TerminalResponse>('/api/terminal/command', {
            state: state,
            entry: entry,
            fs: fs
        });
    }

    /**
     * Retrieves the initial terminal snapshot from the server.
     *
     * @returns {Observable<TerminalSnapshot>} The initial terminal configuration.
     */
    public getInitialTerminalConfiguration() : Observable<TerminalResponse> {
        return this.http.get<TerminalResponse>('/api/terminal');
    }
}
