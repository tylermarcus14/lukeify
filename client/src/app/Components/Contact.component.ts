import { Component } from '@angular/core';

@Component({
    selector: 'contact',
    template: `
        <h1><a class="anchor" name="get-in-touch">Get In Touch</a></h1>
        <section id="get-in-touch">
            <p style="margin-bottom:4em;">You can contact me at <a href="mailto:lukedavia@icloud.com">lukedavia@icloud.com</a>, or <a href="https://twitter.com/lukealization">send me a tweet</a>.</p>
            <!-- https://cssanimation.rocks/clocks/ -->
        </section>
    `
})
export class ContactComponent {
    constructor() {}
}
