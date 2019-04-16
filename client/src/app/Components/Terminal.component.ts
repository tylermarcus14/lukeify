import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {first} from 'rxjs/operators';
import {LukeifyService} from '../Services/LukeifyService';
import {TerminalResponse} from '../Interfaces/TerminalResponse';
import {TerminalState} from '../Interfaces/TerminalState';

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
                       [placeholder]="terminalPlaceholder"
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
    @Output() public emitHeight: EventEmitter<number> = new EventEmitter<number>();

    /**
     *
     */
    public entryStack = [{ original: '', altered: '' }];
    public entryStackIndex = 0;
    public entryStackType = 'original';

    /**
     *
     */
    public terminalHasFocus = true;
    public terminalStateData: TerminalState;
    public terminalPlaceholder = 'Try \`help\` to get started.';

    /**
     *
     */
    private fs = {
        'type': 'dir',
        'isPwd': false,
        'aliases': ['/'],
        'name': '',
        'data': [
            {
                'type': 'dir',
                'isPwd': false,
                'name': 'home',
                'data': [
                    {
                        'type': 'dir',
                        'isPwd': true,
                        'aliases': ['~'],
                        'name': 'visitor',
                        'data': [
                            {
                                'type': 'dir',
                                'isPwd': false,
                                'name': 'downloads',
                                'data': [
                                    {
                                        'type': 'file',
                                        'name': 'test'
                                    }
                                ]
                            },
                            {
                                'type': 'file',
                                'name': 'README.md',
                                'data': `This is a simple JavaScript terminal playground that you can
                                interact with that showcases some of my work.`
                            },
                            {
                                'type': 'dir',
                                'isPwd': false,
                                'name': 'pictures',
                                'data': []
                            },
                            {
                                'type': 'dir',
                                'isPwd': false,
                                'name': 'documents',
                                'data': [
                                    {
                                        'type': 'file',
                                        'name': 'github.md',
                                        'data': 'This is some file'
                                    },
                                    {
                                        'type': 'file',
                                        'name': 'about.md',
                                        'data': 'text'
                                    },
                                    {
                                        'type': 'file',
                                        'name': 'apps.md',
                                        'data': ''
                                    }]
                            }]
                    }]
            }]
    };

    /**
     * A set of hooks that can be run by the terminal playground before and after history has been cleared.
     */
    private hooks = {
        clear: async () => {
            this._clearTerminalHistory();
            return;
        },
        reset: async() => {
            this._clearTerminalHistory();
            await this.ngOnInit();
            return;
        }
    };

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
        this.lukeifyService.getInitialTerminalConfiguration().subscribe((res: TerminalResponse) => {
            this._appendTerminalResponse(res.response);
            this._setTerminalState(res.state);
            this.terminalStateData = res.state;
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
    public terminalContainerClicked($event: MouseEvent): void {
        this._terminalEntry.nativeElement.focus();
        this.terminalHasFocus = true;
        $event.stopPropagation();

        fromEvent(document, 'click').pipe(
            first()
        ).subscribe(() => {
            this.terminalHasFocus = false;
        });
    }

    /**
     *
     * @param $event
     */
    public onNgModelChange($event: KeyboardEvent): void {
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
        if ($event.key === 'Enter') {
            // Grab the current entry text.
            const entry = this.entryStack[this.entryStackIndex].original;

            // Make a request, passing through the terminal
            this.lukeifyService.getCommand(this.terminalStateData, entry, this.fs).subscribe((res: TerminalResponse) => {

                // Unset the terminal placeholder.
                this.terminalPlaceholder = '';

                // Before the history of the client-side terminal is cleared, execute any hooks.
                for (const hook of res.beforeHook) {
                    this.hooks[hook]();
                }

                // Append the previous terminal entry, including user entered text, into the terminal history
                // Then, append the response from the server.
                this._appendLastTerminalEntry(this.terminalStateData, this.entryStack[this.entryStackIndex][this.entryStackType]);
                if (res.response) {
                    this._appendTerminalResponse(res.response);
                }

                // After the history of the client-size terminal is cleared, execute any hooks.
                for (const hook of res.afterHook) {
                    this.hooks[hook]();
                }

                // Push a new entry onto the entry stack so that the user can arrow key backwards and forwards through
                // what they've typed.
                this.entryStack.push({ 'original': '', 'altered': '' });
                this.entryStackIndex++;

                // Update the terminal state from the server's response
                this.terminalStateData = res.state;
                this._setTerminalState(this.terminalStateData);

                // Update the filesystem from the server's response, if it exists
                if (res.hasOwnProperty('fs')) {
                    this.fs = res.fs;
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
     * @private
     */
    public _clearTerminalHistory() {
        this._terminalHistory.nativeElement.innerHTML = '';
    }

    /**
     *
     * @param state
     * @param userEnteredEntry
     * @private
     */
    public _appendLastTerminalEntry(state: TerminalState, userEnteredEntry: string): void {
        this._terminalHistory.nativeElement.innerHTML += this._createTerminalEntry(state) + userEnteredEntry + '<br/>';
    }

    /**
     *
     * @param response
     * @private
     */
    public _appendTerminalResponse(response: string): void {
        this._terminalHistory.nativeElement.innerHTML += response + '<br/>';
    }

    /**
     * Sets the current terminal state, also updating the width of the input element.
     *
     * @setter
     *
     * @param {TerminalState} state
     */
    public _setTerminalState(state: TerminalState): void {
        this._terminalState.nativeElement.innerHTML = this._createTerminalEntry(state);
        this._terminalState.nativeElement.style.width = this._terminalState.nativeElement.width;
    }

    /**
     *
     * @param terminalState
     * @param response
     */
    private _createTerminalEntry(terminalState: TerminalState, response: string = null): string {
        if (!terminalState) {
            return null;
        }
        let trimmedDirOrAlias = terminalState.pwd.split('/').pop();

        if (terminalState.alias !== null) {
            trimmedDirOrAlias = terminalState.alias;
        }

        return `<span class="term-color term-sky">${terminalState.user}</span>:<span class="term-color term-purple">${trimmedDirOrAlias}</span>$&nbsp;`;
    }
}
