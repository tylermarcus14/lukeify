// import {Component, OnInit, ViewChild} from "@angular/core";
// import {LukeifyService} from "../Services/LukeifyService";
// import {TerminalSnapshot} from "../Interfaces/TerminalSnapshot";
// import {TerminalContextData} from "../Interfaces/TerminalContextData";
// import {Observable} from "rxjs/Observable";
// import 'rxjs/add/observable/fromEvent';
// import {first} from "rxjs/operators";
//
// @Component({
//     selector: 'lukeify-terminal',
//     template: `
//         <div id="terminal-container" (click)="terminalContainerClicked($event)">
//
//             <div id="terminal-header">
//                 <span class="terminal-button term-button-red" [class.terminal-not-focused]="!terminalHasFocus"></span>
//                 <span class="terminal-button term-button-amber" [class.terminal-not-focused]="!terminalHasFocus"></span>
//                 <span class="terminal-button term-button-green" [class.terminal-not-focused]="!terminalHasFocus"></span>
//             </div>
//
//             <div id="terminal">
//                 <span #terminalHistory id="terminal-history"></span>
//                 <span #terminalContext id="terminal-context"></span>
//                 <input #terminalEntry id="terminal-entry" type="text" (ngModelChange)="onKeyUp($event)" [ngModel]="userEntryData.stack.altered[userEntryData.index]">
//             </div>
//
//         </div>
//     `
// })
// export class TerminalComponent implements OnInit {
//
//     @ViewChild('terminalHistory') public _terminalHistory;
//     @ViewChild('terminalContext') public _terminalContext;
//     @ViewChild('terminalEntry') public _terminalEntry;
//
//     /**
//      *
//      */
//     public terminalContextData: TerminalContextData;
//
//     public userEntryData = {
//         stack: [{ original: "", altered: "" }],
//         index: 0
//     };
//
//     public terminalHasFocus: boolean = false;
//
//     /**
//      *
//      */
//     public get terminalHistory() : string {
//         return this._terminalHistory.nativeElement.innerHTML;
//     }
//
//     /**
//      *
//      * @param {string} data
//      */
//     public set terminalHistory(data: string) {
//         this._terminalHistory.nativeElement.innerHTML = data;
//     }
//
//     /**
//      *
//      */
//     public get terminalContext() : string {
//         return this._terminalContext.nativeElement.innerHTML;
//     }
//
//     /**
//      *
//      * @param {string} data
//      */
//     public set terminalContext(data: string) {
//         this._terminalContext.nativeElement.innerHTML = data;
//         this._terminalContext.nativeElement.style.width = this._terminalContext.nativeElement.width;
//     }
//
//     public constructor(public lukeifyService: LukeifyService) {}
//
//     /**
//      *
//      */
//     public ngOnInit() : void {
//         this.lukeifyService.getInitialTerminalConfiguration().subscribe(response => {
//             this.terminalHistory = response.terminalHistory;
//             this.terminalContext = this.asHumanReadableTerminalContext(response.terminalContext);
//             this.terminalContextData = response.terminalContext;
//         });
//     }
//
//     /**
//      * Function to be called when the terminal container is clicked.
//      *
//      * @param {MouseEvent} $event - The event that triggered this function call.
//      */
//     public terminalContainerClicked($event: MouseEvent) : void {
//         this._terminalEntry.nativeElement.focus();
//         this.terminalHasFocus = true;
//         $event.stopPropagation();
//
//         Observable.fromEvent(document, 'click').pipe(
//             first()
//         ).subscribe(event => {
//             this.terminalHasFocus = false;
//         });
//     }
//
//     /**
//      *
//      * @param $event
//      */
//     public onKeyUp($event: KeyboardEvent) : void {
//         if ($event.which === 13) { // Enter
//             const entrySnapshot = this.userEntryData.stack[this.userEntryData.index];
//
//             this.userEntryData.stack.push("");
//             this.userEntryData.index = this.userEntryData.stack.length - 1;
//
//             this.lukeifyService.getCommand(this.terminalHistory, this.terminalContextData, entrySnapshot).subscribe((response: TerminalSnapshot) => {
//                 this.terminalHistory = response.terminalHistory;d
//                 this.terminalContextData = response.terminalContext;
//                 this.terminalContext = this.asHumanReadableTerminalContext(response.terminalContext);
//             });
//
//         } else if ($event.which === 38) { // Arrow up
//             if (this.userEntryData.index > 0) {
//                 this.userEntryData.index--;
//             }
//
//         } else if ($event.which === 40) { // Arrow down
//             if (this.userEntryData.index < this.userEntryData.stack.length - 1) {
//                 this.userEntryData.index++;
//             }
//         }
//     }
//
//     /**
//      *
//      *
//      * @param {TerminalContextData} terminalContextData
//      *
//      * @returns {string}
//      */
//     private asHumanReadableTerminalContext(terminalContextData: TerminalContextData) : string {
//         let trimmedDirOrAlias = terminalContextData.pwd.split("/").pop();
//
//         if (terminalContextData.alias !== null) {
//             trimmedDirOrAlias =  terminalContextData.alias;
//         }
//
//         return '<span class="term-color term-sky">' + terminalContextData.user + '</span>:<span class="term-color term-red">' + trimmedDirOrAlias + '</span>$&nbsp;';
//     }
// }