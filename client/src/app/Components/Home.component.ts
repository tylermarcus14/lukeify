import {Component} from "@angular/core";
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';

@Component({
    'selector': 'home',
    'template': `
        <section id="professional-outline"></section>

        <ul id="segmented-control">
            <li (click)="beginAnimationChange()" [class.active]="aboveTheFoldContentStates.terminal === 'active'">
                <span>Developer</span>
            </li>
            <li (click)="beginAnimationChange()" [class.active]="aboveTheFoldContentStates.instagram === 'active'">
                <span>Photographer</span>
            </li>
        </ul>

        <div id="above-the-fold-content" [style.height]="aboveTheFoldContentHeightInPx">
            <lukeify-instagram [@fadeInDown]="aboveTheFoldContentStates.instagram"
                               (@fadeInDown.done)="animationDone($event)"
                               (emitHeight)="setHeightOfAboveTheFoldContent($event, 'instagram')"></lukeify-instagram>

            <lukeify-terminal [@fadeInDown]="aboveTheFoldContentStates.terminal"
                              (@fadeInDown.done)="animationDone($event)"
                              (emitHeight)="setHeightOfAboveTheFoldContent($event, 'terminal')"></lukeify-terminal>
        </div>

        <p id="introduction">Hi, I'm Luke Davia—a software developer currently residing in
            Wellington,&nbsp;New&nbsp;Zealand.</p>

        <h1><a class="anchor" name="skillset">Skillset</a></h1>
        <section id="skillset">
            <ul>
                <li>Builds performant web applications with great UX using popular frameworks: Vue, Angular 2.</li>
                <li>Experience with architecting, developing, & deploying Node.js applications.</li>
                <li>5 years of PHP development, often with the Laravel framework.</li>
                <li>3 years of professional C# & ASP.NET Core experience.</li>
                <li>Currently learning Rust & Swift.</li>
                <li>Focuses on performant solutions that adhere to best practices.</li>
                <li>Works anywhere between graphic design & schema design.</li>
                <li>BCompSc from Victoria University, Wellington.</li>
            </ul>
        </section>

        <h1><a class="anchor" name="portfolio">Portfolio</a></h1>
        <section id="portfolio">
            <p>Some of what I've built. There's more on <a href="https://github.com/lukeify">GitHub</a>. Here's my <a href="assets/documents/cv-web.pdf" target="_blank">CV</a>.</p>
            <ul id="portfolio-entries">
                <li class="portfolio-entry">
                    <h2>
                        Autodesk Building Information Management & Authentication Software <span class="small">for Caduceus Systems</span>
                    </h2>
                    <span class="dates">February 2017 – Ongoing</span>
                    <span class="company-or-github"><a href="https://www.caduceus.co.nz/">Company ⇒</a></span>
                    <p>
                        Architected an authentication system in Node.js & Angular for an existing Building 
                        Information Management application. Further upgraded incrementally to add Autodesk bucket 
                        management functionality later. Employed technical writing skills to document existing systems.
                    </p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/autodesk.png" alt="Autodesk API"
                                                  title="Autodesk API"></li>
                        <li class="tool-tag"><img src="assets/images/tools/nodejs.png" alt="Node.js"
                                                  title="Node.js"></li>
                        <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular"
                                                  title="Angular"></li>
                        <li class="tool-tag"><img src="assets/images/tools/npm.png" alt="NPM" title="NPM"></li>
                        <li class="tool-tag"><img src="assets/images/tools/ts.png" alt="TypeScript"
                                                  title="TypeScript"></li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>Membership Management & Onboarding Revamp <span class="small">for NZPPI</span>
                    </h2>
                    <span class="dates">January 2018 – Ongoing</span>
                    <span class="company-or-github"><a href="https://nzppi.org.nz">Company ⇒</a></span>
                    <p>Developed & deployed an updated branding & web presence, elucidating the benefits of NZPPI
                     membership through effective use of design and textual information.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel"
                                                  title="Laravel"></li>
                        <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer"
                                                  title="Composer"></li>
                        <li class="tool-tag"><img src="assets/images/tools/yarn.png" alt="Yarn" title="Yarn"></li>
                        <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                        <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript"
                                                  title="JavaScript"></li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>Ordering, Quoting, & Resource Management Software <span
                            class="small">for Caduceus Systems</span></h2>
                    <span class="dates">January 2018 – Ongoing</span>
                    <span class="company-or-github"><a href="https://www.caduceus.co.nz/">Company ⇒</a></span>
                    <p>Architected a Ordering, Quoting, & Resource Management application, significantly improving 
                    day to day operations by automating a number of manual systems, improving business actionables, 
                    and allowing for better client-supplier relationships.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                        <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel"
                                                  title="Laravel"></li>
                        <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer"
                                                  title="Composer"></li>
                        <li class="tool-tag"><img src="assets/images/tools/elastic.png" alt="ElasticSearch"
                                                  title="ElasticSearch"></li>
                        <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular"
                                                  title="Angular"></li>
                        <li class="tool-tag"><img src="assets/images/tools/ts.png" alt="TypeScript"
                                                  title="TypeScript"></li>
                        <li class="tool-tag"><img src="assets/images/tools/yarn.png" alt="Yarn" title="Yarn"></li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>QuebecLimaMike <span class="small">for Revitworks</span></h2>
                    <span class="dates">July 2018 – Ongoing</span>
                    <span class="company-or-github"><a href="https://www.caduceus.co.nz/">Company ⇒</a></span>
                    <p>Developed an event-based ASP.NET Core Application which listened for purchases on an Ecwid 
                    storefont, subsequently generated product license keys to meet bespoke business requirements, 
                    resulting in significant time savings & increased customer satisfaction.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/aspdotnetcore.png" alt="ASP.NET Core"
                                                  title="ASP.NET Core"></li>
                        <li class="tool-tag"><img src="assets/images/tools/csharp.png" alt="C#" title="C#"></li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>fs.lukeify.com</h2>
                    <span class="company-or-github"><a href="https://github.com/lukeify/lukeify-fs">View on GitHub ⇒</a></span>
                    <p>Personal cloud-based file system & storage with drag+drop uploading written
                        in Vue.js. TypeScript-written express.js server with static nginx-based
                        file serving.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/vue.png" alt="Vue" title="Vue"></li>
                        <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript"
                                                  title="JavaScript"></li>
                        <li class="tool-tag"><img src="assets/images/tools/aspdotnetcore.png" alt="ASP.NET Core"
                                                  title="ASP.NET Core"></li>
                        <li class="tool-tag"><img src="assets/images/tools/csharp.png" alt="C#" title="C#"></li>
                        <li class="tool-tag"><img src="assets/images/tools/rethinkdb.png" alt="RethinkDB"
                                                  title="RethinkDB"></li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>gpxify</h2>
                    <span class="company-or-github"><a href="https://github.com/lukeify/gpxify">View on GitHub ⇒</a></span>
                    <p>CLI app that allows for the linear interpolation of GPX tracklog data to geotag photos from 
                    GPSless cameras (such as some DSLRs) with GPS EXIF data.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/rust.png" alt="Rust" title="Rust"></li>
                        <li class="tool-tag"><img src="assets/images/tools/cargo.png" alt="Cargo" title="Cargo">
                        </li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>Junior Front End Developer <span class="small">at Quantate</span></h2>
                    <span class="dates">November 2014 – December 2016</span>
                    <span class="company-or-github"><a href="https://www.quantate.com">Company ⇒</a></span>
                    <p>Predominantly front-end development using tools & technologies to create modern application
                        interfaces, as well as back end development of applications on a Microsoft-based stack.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/csharp.png" alt="C#" title="C#"></li>
                        <li class="tool-tag"><img src="assets/images/tools/aspdotnetcore.png" alt="ASP.NET Core"
                                                  title="ASP.NET Core"></li>
                        <li class="tool-tag"><img src="assets/images/tools/knockout.png" alt="Knockout"
                                                  title="Knockout"></li>
                        <li class="tool-tag"><img src="assets/images/tools/angularjs.png" alt="Angular.js"
                                                  title="Angular.js"></li>
                        <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular"
                                                  title="Angular"></li>
                        <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript"
                                                  title="JavaScript"></li>
                    </ul>
                </li>
                <li class="portfolio-entry">
                    <h2>SpaceX Stats</h2>
                    <p>Small fan site which track of the progress of private spaceflight company SpaceX, offering 
                    statistics and countdowns to launches.</p>
                    <ul>
                        <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                        <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel"
                                                  title="Laravel"></li>
                        <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer"
                                                  title="Composer"></li>
                        <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular"
                                                  title="Angular"></li>
                        <li class="tool-tag"><img src="assets/images/tools/angularjs.png" alt="Angular.js"
                                                  title="Angular.js"></li>
                        <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript"
                                                  title="JavaScript"></li>
                        <li class="tool-tag"><img src="assets/images/tools/elastic.png" alt="ElasticSearch"
                                                  title="ElasticSearch"></li>
                        <li class="tool-tag"><img src="assets/images/tools/websockets.png" alt="Websockets"
                                                  title="Websockets"></li>
                        <li class="tool-tag"><img src="assets/images/tools/redis.png" alt="Redis" title="Redis">
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        
        <h1><a class="anchor" name="get-in-touch">Get In Touch</a></h1>
        <section id="get-in-touch">
            <p style="margin-bottom:4em;">You can contact me at <a href="mailto:lukedavia@icloud.com">lukedavia@icloud.com</a>, or <a href="https://twitter.com/lukealization">send me a tweet</a>.</p>
            <!-- https://cssanimation.rocks/clocks/ -->
        </section>
    `,
    animations: [
        trigger('fadeInDown', [
            state('active', style({
                transform: 'translateY(0)',
                opacity: 1,
                visibility: 'visible',
                position: 'relative'
            })),
            state('inactive', style({
                transform: 'translateY(-3em)',
                opacity: 0,
                visibility: 'hidden',
                position: 'absolute'
            })),
            state('void', style({
                transform: 'translateY(-3em)',
                opacity: 0,
                visibility: 'visible',
                position: 'relative'
            })),
            transition('void => active', [
                animate('800ms 500ms ease-in-out', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
            ]),
            transition('inactive => active', [
                style({ visibility: 'visible', position: 'relative' }),
                animate('600ms ease-in-out', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
            ]),
            transition('active => inactive', [
                animate('600ms ease-in-out', style({
                    transform: 'translateY(-3em)',
                    opacity: 0
                })),
                style({ visibility: 'hidden', position: 'absolute' })
            ])
        ])
    ]
})
export class HomeComponent {
    public dateOfBirth: Date = new Date(1995, 6, 12);

    public isAnimating: boolean = false;

    public aboveTheFoldContentStates = {
        terminal: 'active',
        instagram: 'inactive'
    };

    public aboveTheFoldContentHeights = {
        terminal: null,
        instagram: null
    };

    /**
     *
     *
     * @returns {string} The pixel height that the above the fold content element should be.
     */
    public get aboveTheFoldContentHeightInPx(): string {
        if (typeof this.aboveTheFoldContentHeights.terminal === "number"
            && typeof this.aboveTheFoldContentHeights.instagram === "number") {
            return Math.max(...Object.values(this.aboveTheFoldContentHeights)) + "px";
        }
        return "750px"; // best guess
    }

    public constructor() {}

    /**
     * Called when the animation should begin.
     */
    public beginAnimationChange(): void {
        this.isAnimating = true;
        if (this.aboveTheFoldContentStates.terminal === "active") {
            this.aboveTheFoldContentStates.terminal = "inactive";
        } else if (this.aboveTheFoldContentStates.instagram === "active") {
            this.aboveTheFoldContentStates.instagram = "inactive";
        }
    }

    /**
     * Called when one of the animations for the above the fold content completes.
     *
     * @param $event {AnimationEvent} - The animation which just finished playing.
     */
    public animationDone($event: AnimationEvent): void {
        if (this.isAnimating) {
            this.isAnimating = false;
            if ($event.element['localName'].endsWith('terminal')) {
                this.aboveTheFoldContentStates.instagram = "active";
            } else {
                this.aboveTheFoldContentStates.terminal = "active";
            }
        }
    }

    /**
     *
     * @param height {number} - The height of the component.
     * @param component {string} - The component the height is for.
     */
    public setHeightOfAboveTheFoldContent(height: number, component: string): void {
        this.aboveTheFoldContentHeights[component] = height;
    }
}
