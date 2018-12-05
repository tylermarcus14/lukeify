import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import {fromEvent} from "rxjs";
import {first} from "rxjs/operators";
import {LukeifyService} from "../Services/LukeifyService";
import {TerminalResponse} from '../Interfaces/TerminalResponse';
import {TerminalState} from "../Interfaces/TerminalState";

@Component({
    selector: 'lukeify-terminal',
    template: `
        <div id="terminal-container" (click)="terminalContainerClicked($event)">

            <div id="terminal-header">
                <span class="terminal-button term-button-red" [class.terminal-not-focused]="!terminalHasFocus"></span>
                <span class="terminal-button term-button-amber" [class.terminal-not-focused]="!terminalHasFocus"></span>
                <span class="terminal-button term-button-green" [class.terminal-not-focused]="!terminalHasFocus"></span>
            </div>

            <div id="terminal" #terminal>
                <span #terminalHistory id="terminal-history"></span>
                <span #terminalState id="terminal-state"></span>
                <input #terminalEntry id="terminal-entry" type="text" autocomplete="off" spellcheck="false"
                       [(ngModel)]="entryStack[entryStackIndex][entryStackType]"
                       (keyup)="onKeyUp($event)">
            </div>
        </div>
    `
})
/**
 * @class TerminalComponent
 */
export class TerminalComponent implements OnInit, AfterViewInit {

    @ViewChild('terminal') public _terminal;
    @ViewChild('terminalHistory') public _terminalHistory;
    @ViewChild('terminalState') public _terminalState;
    @ViewChild('terminalEntry') public _terminalEntry;

    /**
     *
     */
    @Output() public emitHeight : EventEmitter<number> = new EventEmitter<number>();

    /**
     *
     */
    public entryStack = [{ original: "", altered: "" }];
    public entryStackIndex = 0;
    public entryStackType = "original";

    /**
     *
     */
    public terminalHasFocus: boolean = true;
    public terminalStateData: TerminalState;

    /**
     * A set of hooks that can be run by the terminal playground before and after history has been cleared.
     */
    private hooks = {
        clear: async () => {
            this.terminalHistory = "";
            return;
        },
        reset: async() => {
            await this.ngOnInit();
            return;
        }
    };

    /**
     *
     */
    private fs = {
        "type": "dir",
        "aliases": ["/"],
        "name": "",
        "data": [{

            "type": "dir",
            "name": "home",
            "data": [{

                "type": "dir",
                "aliases": ["~"],
                "name": "visitor",
                "data": [{

                    "type": "dir",
                    "name": "downloads",
                    "data": [{
                        "type": "file",
                        "name": ""
                    }]
                },
                    {
                        "type": "file",
                        "name": "README.md",
                        "data": "This is a simple JavaScript terminal playground that you can interact with that showcases some of my work."
                    },
                    {
                        "type": "dir",
                        "name": "pictures",
                        "data": []
                    },
                    {
                        "type": "dir",
                        "name": "documents",
                        "data": [{

                            "type": "file",
                            "name": "github.md",
                            "data": "This is some file"
                        },
                            {
                                "type": "file",
                                "name": "about.md",
                                "data": "text"
                            },
                            {
                                "type": "file",
                                "name": "apps.md",
                                "data": ""
                            }]
                    }]
            }]
        }]
    };


    /**
     *
     */
    public get terminalHistory() : string {
        return this._terminalHistory.nativeElement.innerHTML;
    }

    /**
     *
     * @param {string} data
     */
    public set terminalHistory(data: string) {
        this._terminalHistory.nativeElement.innerHTML = data;
    }

    /**
     *
     */
    public get terminalState() : string {
        return this._terminalState.nativeElement.innerHTML;
    }

    /**
     * Sets the current terminal state, also updating the width of the input element.
     *
     * @setter
     *
     * @param {string} data
     */
    public set terminalState(data: string) {
        this._terminalState.nativeElement.innerHTML = data;
        this._terminalState.nativeElement.style.width = this._terminalState.nativeElement.width;
    }

    /**
     * Constructor.
     *
     * @param element {ElementRef} - The element reference to this component.
     * @param lukeifyService {LukeifyService} - The service by which we make requests to our server.
     */
    public constructor(public element: ElementRef, public lukeifyService: LukeifyService) {}

    /**
     * When the component is initialized, fetch the initial terminal configuration from our server.
     */
    public ngOnInit(): void {
        this.lukeifyService.getInitialTerminalConfiguration().subscribe((response: TerminalResponse) => {
            this.terminalHistory = response.response;
            this.terminalState = this.asHumanReadableTerminalState(response.state);
            this.terminalStateData = response.state;
        });
    }

    /**
     *
     */
    public ngAfterViewInit(): void {
        this.emitHeight.emit(this.element.nativeElement.getBoundingClientRect().height);
    }

    /**
     * Function to be called when the terminal container is clicked. This toggles the color indications of the exit, minimise,
     * maximise buttons in the terminal 'window'.
     *
     * @param {MouseEvent} $event - The event that triggered this function call.
     */
    public terminalContainerClicked($event: MouseEvent) : void {
        this._terminalEntry.nativeElement.focus();
        this.terminalHasFocus = true;
        $event.stopPropagation();

        fromEvent(document, 'click').pipe(
            first()
        ).subscribe(event => {
            this.terminalHasFocus = false;
        });
    }

    /**
     *
     * @param $event
     */
    public onNgModelChange($event: KeyboardEvent) : void {
    }

    /**
     * Intercept keyup events from the input to tell when special keys (enter, arrows, etc) are pressed. For example, when
     * the enter key is pressed, we send a request off to our server to process the entered text from the user.
     *
     * @param $event {KeyboardEvent} - The keyboard event which caused the running of this method.
     *
     */
    public onKeyUp($event: KeyboardEvent): void {
        // When the enter key is pressed, send a request off to the server to interpret the result.
        if ($event.key === "Enter") {
            // Grab the current entry text.
            const entry = this.entryStack[this.entryStackIndex].original;

            // Make a request, passing through the terminal
            this.lukeifyService.getCommand(this.terminalStateData, entry, this.fs).subscribe((response: TerminalResponse) => {

                // Before the history of the client-side terminal is cleared, execute any hooks.
                for (let hook of response.beforeHook) {
                    this.hooks[hook]();
                }

                // Append the response from the server to the terminal history.
                this.terminalHistory += response.response;

                // After the history of the client-size terminal is cleared, execute any hooks.
                for (let hook of response.afterHook) {
                    this.hooks[hook]();
                }

                // Push a new entry onto the entry stack so that the user can arrow key backwards and forwards through
                // what they've typed.
                this.entryStack.push({ "original": "", "altered": "" });
                this.entryStackIndex++;

                // Update the terminal state from the server's response
                this.terminalStateData = response.state;
                this.terminalState = this.asHumanReadableTerminalState(response.state);

                // Update the filesystem from the server's response, if it exists
                if (response.hasOwnProperty('fs')) {
                    this.fs = response.fs;
                }

                // Make sure the new input is always in view
                this._terminal.nativeElement.scrollTop = this._terminalEntry.nativeElement.offsetTop;
            });
        }

        /*
        } else if ($event.key === "Arrow Up") {
            if (this.userEntryData.index > 0) {
                this.userEntryData.index--;
            }

        } else if ($event.key === "Arrow Down") {
            if (this.userEntryData.index < this.userEntryData.stack.length - 1) {
                this.userEntryData.index++;
            }
        }*/
    }

    /**
     *
     *
     * @param {TerminalState} terminalState
     *
     * @returns {string}
     */
    private asHumanReadableTerminalState(terminalState: TerminalState) : string {
        let trimmedDirOrAlias = terminalState.pwd.split("/").pop();

        if (terminalState.alias !== null) {
            trimmedDirOrAlias = terminalState.alias;
        }

        return '<span class="term-color term-sky">' + terminalState.user + '</span>:<span class="term-color term-red">' + trimmedDirOrAlias + '</span>$&nbsp;';
    }
}
