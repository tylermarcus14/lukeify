import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LukeifyService} from "../Services/LukeifyService";
import {validateEmail} from "../Validators/validateEmail";

@Component({
    selector: 'contact',
    template: `
        <h1><a class="anchor" name="get-in-touch">Get In Touch</a></h1>
        <section id="get-in-touch">
            <p>I'm currently employed, but you can contact me at <a href="mailto:lukedavia@icloud.com">lukedavia@icloud.com</a>, or <a href="https://twitter.com/lukealization">send me a tweet</a>. Alternatively, use the form below.</p>
            <!-- https://cssanimation.rocks/clocks/ -->
            <form id="get-in-touch-form" [formGroup]="getInTouchForm" (ngSubmit)="getInTouch()" novalidate>
                <fieldset>
                    <legend>Get In Touch</legend>
                    <ul *ngIf="!messageState.sent">
                        <li>
                            <label for="name" id="get-in-touch-name">Name</label>
                            
                            <input class="expandable" type="text" name="name" formControlName="name" maxlength="30" 
                            placeholder="<input name=&quot;name&quot; required />" 
                            aria-required="true" aria-labelledby="get-in-touch-name" required>
                            
                            <span class="js-check"></span>
                        </li>
                        
                        <li>
                            <label for="email" id="get-in-touch-email">Email</label>
                            
                            <input class="expandable" type="email" name="email" formControlName="email" maxlength="50" 
                            placeholder="<input name=&quot;email&quot; required />" 
                            aria-required="true" aria-labelledby="get-in-touch-email" required>
                            
                            <span class="js-check" *ngIf="!getInTouchForm.controls['email'].valid"></span>
                        </li>
                        
                        <li class="full">
                            <label for="message" id="get-in-touch-message">Message</label>
                            
                            <textarea name="message" rows="10" minlength="100" maxlength="2000" formControlName="message" 
                            placeholder="<textarea name=&quot;message&quot; minlength=&quot;100&quot; maxlength=&quot;2000&quot; required></textarea>" 
                            aria-required="true" aria-labelledby="get-in-touch-message" required></textarea>
                            
                            <span class="character-count">{{ charactersRemaining() }}</span>
                        </li>		
                        
                        <li class="full">
                            <button class="get-in-touch-button" type="submit" [disabled]="messageState.sending || getInTouchForm.invalid">{{ messageState.sending ? "Sending..." : "Send" }}</button>
                        </li>			
                    </ul>	
                    <p *ngIf="messageState.sent">Thanks for your message! I'll get back to you shortly.</p>
                </fieldset>
            </form>
        </section>
    `
})
export class ContactComponent {
    public getInTouchForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.maxLength(50), validateEmail]),
        message: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(2000)])
    });

    public messageState = {
        sending: <boolean> false,
        sent: <boolean> false
    };

    constructor(public lukeifyService: LukeifyService) {}

    /**
     * Calls the website frontend service to send a message to the API layer.
     */
    public getInTouch() : void {
        this.messageState.sending = true;
        this.lukeifyService.getInTouch(this.getInTouchForm.value).subscribe(response => {
            this.messageState.sending = false;
            this.messageState.sent = true;
        });
    }

    /**
     * A string indicating how many characters remain in the textarea.
     */
    public charactersRemaining(): string {
        let maximumCharacters = 2000;
        let minimumCharacters = 100;
        let messageLength = this.getInTouchForm.controls['message'].value.length;

        if (messageLength === minimumCharacters - 1) {
            return `Need ${minimumCharacters - messageLength} more character`;
        } else if (messageLength < 100) {
            return `Need ${minimumCharacters - messageLength} more characters`;
        } else if (messageLength === maximumCharacters + 1) {
            return `${messageLength - maximumCharacters} character too long.`;
        } else if (messageLength > maximumCharacters) {
            return `${messageLength - maximumCharacters} characters too long.`;
        } else if (maximumCharacters - messageLength === 1) {
            return `${maximumCharacters - messageLength} character remaining.`;
        } else {
            return `${maximumCharacters - messageLength} characters remaining.`;
        }
    }
}