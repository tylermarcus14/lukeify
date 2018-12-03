import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Tweet} from "../Interfaces/Tweet";
import {TerminalCommandResponse} from "../Interfaces/TerminalCommandResponse";
import {TerminalContextData} from "../Interfaces/TerminalContextData";

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
     * @param {TerminalContextData} contextData - The context, i.e. directory from which the command is being executed.
     * @param {string} entry - The entry being executed (i.e. the full user input containing the command and the parameters if any).
     *
     * @returns {Observable<TerminalSnapshot>} The next terminal configuration.
     */
    public getCommand(history: string, contextData: TerminalContextData, entry: string) : Observable<TerminalCommandResponse> {
        return this.http.post<TerminalCommandResponse>('/api/command', {
            history: history,
            context: contextData,
            entry: entry
        });
    }

    /**
     * Retrieves the initial terminal snapshot from the server.
     *
     * @returns {Observable<TerminalSnapshot>} The initial terminal configuration.
     */
    public getInitialTerminalConfiguration() : Observable<TerminalCommandResponse> {
        return this.http.get<TerminalCommandResponse>('/api/initialterminalconfiguration');
    }
}
