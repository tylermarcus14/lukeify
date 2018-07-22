import {Component, OnInit} from "@angular/core";
import {LukeifyService} from '../Services/LukeifyService';

@Component({
    'selector': 'home',
    'template': `        
        <section id="professional-outline"></section>
        
        <section id="insta" #insta [class.hasnt-loaded]="instasLoaded !== 9">
            <p id="insta-label">The latest from my Instagram...</p>
            <ul>
                <li *ngFor="let insta of instas">
                    <a *ngIf="insta !== undefined" [href]="'https://instagram.com/p/' + insta.shortcode" target="_blank" [title]="insta.caption">
                        <span class="like-data">
                            <svg class="like-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
                            <span class="like-count">{{ insta.likes }}</span>
                        </span>
                        <img [src]="insta.thumb" [alt]="insta.caption" (load)="imageHasLoaded()">
                    </a>
                </li>
            </ul>
        </section>
        
        <!--<lukeify-terminal></lukeify-terminal>-->
		
		<p id="introduction">Hi, I'm Luke Davia—a {{ currentAge }} year old software developer currently residing in Wellington,&nbsp;New&nbsp;Zealand.</p>

        <a class="anchor" name="skillset"><h1>Professional Skillset</h1></a>
		<section id="skillset">
			<ul>				
				<li>2 years of professional C# & ASP.NET COre experience with Angular.js frontends.</li>
				<li>Professional experience with architecting, developing, & deploying Angular & Node.js applications.</li>
                <li>5+ years of PHP development, Laravel backends acting as APIs, deployment to Forge.</li>
				<li>Builds compelling web applications with great UX using popular frameworks: Vue, Angular 2.</li>				
				<li>Tooling proficient: DigitalOcean, Redis, Elasticsearch, Vagrant.</li>
				<li>Focuses on performant solutions that adhere to best practices.</li>
				<li>Confident anywhere between graphic design & schema design.</li>
                <li>BCompSc from Victoria University, Wellington.</li>
			</ul>
		</section>
		
		<h1><a class="anchor" name="portfolio">Portfolio</a></h1>
		<section id="portfolio">		    
			<table>
				<caption>Some of what I've worked on. There's more on <a href="https://github.com/lukeify">Github</a>.</caption>
				<tbody>
                    <tr>
                        <td>
                            <h2>Autodesk Building Information Management & Authentication Software <span class="small">for Caduceus Systems</span></h2>
                            <span><a href="https://www.caduceus.co.nz/">Company ⇒</a></span>
                            <p>Developer employed as a contractor to provide software design & development services. Architected an authentication system written in Node.js & Angular for a Building Information Management application for Caduceus Systems, which was then further upgraded incrementally with more features through to February 2018. Additionally, documented existing systems for future use and reference.</p>
                            <ul>
                                <li class="dates">February 2017 –</li>
                                <li class="tool-tag"><img src="assets/images/tools/autodesk.png" alt="Autodesk API" title="Autodesk API"></li>
                                <li class="tool-tag"><img src="assets/images/tools/nodejs.png" alt="Node.js" title="Node.js"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular" title="Angular"></li>
                                <li class="tool-tag"><img src="assets/images/tools/npm.png" alt="NPM" title="NPM"></li>
                                <li class="tool-tag"><img src="assets/images/tools/ts.png" alt="TypeScript" title="TypeScript"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>Membership Management & Onboarding Revamp <span class="small">for New Zealand Plant Producers Incorporated</span></h2>
                            <span><a href="">Company ⇒</a></span>
                            <p>Currently developing & deploying an updated branding & web presence for New Zealand Plant Producers Incorporated elucidating the benefits of joining NZPPI membership through effective use of design and textual information.</p>
                            <ul>
                                <li class="dates">January 2018 –</li>
                                <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel" title="Laravel"></li>
                                <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer" title="Composer"></li>
                                <li class="tool-tag"><img src="assets/images/tools/yarn.png" alt="Yarn" title="Yarn"></li>
                                <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                                <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript" title="JavaScript"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>Ordering, Quoting, & Resource Management Software <span class="small">for Caduceus Systems</span></h2>
                            <span><a href="https://www.caduceus.co.nz/">Company ⇒</a></span>
                            <p>Currently architecting a web-based flagship Ordering, Quoting, & Resource Management application for Caduceus Systems, that significantly improved day to day operations by automating a number of manual systems, improving infra-business action transparency and history, and allowing for better client-supplier relationships.</p>
                            <ul>
                                <li class="dates">January 2018 –</li>
                                <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                                <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel" title="Laravel"></li>
                                <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer" title="Composer"></li>
                                <li class="tool-tag"><img src="assets/images/tools/elastic.png" alt="ElasticSearch" title="ElasticSearch"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular" title="Angular"></li>
                                <li class="tool-tag"><img src="assets/images/tools/ts.png" alt="TypeScript" title="TypeScript"></li>
                                <li class="tool-tag"><img src="assets/images/tools/yarn.png" alt="Yarn" title="Yarn"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>QuebecLimaMike <span class="small">for Revitworks</span></h2>
                            <span><a href="https://www.caduceus.co.nz/">Company ⇒</a></span>
                            <p>Revitworks foresaw the need to have a service which integrates their Ecwid storefront where products are sold, to Quick License Manager, which helps Revitworks manage licenses for their sold products. By developing an ASP.NET Core Application which ran locally and listened for Ecwid purchases, the generation of license keys to meet bespoke business requirements was automated, resulting in significant time savings for Revitworks, as well as increased customer satisfaction, as users now receive their licenses immediately upon payment.</p>
                            <ul>
                                <li class="dates">July 2018 –</li>
                                <li class="tool-tag"><img src="assets/images/tools/aspdotnetcore.png" alt="ASP.NET Core" title="ASP.NET Core"></li>
                                <li class="tool-tag"><img src="assets/images/tools/csharp.png" alt="C#" title="C#"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>fs.lukeify.com</h2>
                            <span><a href="https://github.com/lukeify/lukeify-fs">View on GitHub ⇒</a></span>
                            <p>Personal arbitrary cloud-based file system and storage with drag and drop uploading written in Vue.js on the frontend, and TypeScript express.js on the back with static nginx-based file serving.</p>
                            <ul>
                                <li class="tool-tag"><img src="assets/images/tools/vue.png" alt="Vue" title="Vue"></li>
                                <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript" title="JavaScript"></li>
                                <li class="tool-tag"><img src="assets/images/tools/aspdotnetcore.png" alt="ASP.NET Core" title="ASP.NET Core"></li>
                                <li class="tool-tag"><img src="assets/images/tools/csharp.png" alt="C#" title="C#"></li>
                                <li class="tool-tag"><img src="assets/images/tools/rethinkdb.png" alt="RethinkDB" title="RethinkDB"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>gpxify</h2>
                            <span><a href="https://github.com/lukeify/gpxify">View on GitHub ⇒</a></span>
                            <p>An in-progress command line application that allows for the linear interpolation of GPX tracklog data to geotag photos from GPSless cameras (such as some DSLRs) with GPS EXIF data. Especially useful if you have an Apple Watch!</p>
                            <ul>
                                <li class="tool-tag"><img src="assets/images/tools/rust.png" alt="Rust" title="Rust"></li>
                                <li class="tool-tag"><img src="assets/images/tools/cargo.png" alt="Cargo" title="Cargo"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>Junior Front End Developer <span class="small">at Quantate Ltd.</span></h2>
                            <span><a href="https://www.quantate.com">Company ⇒</a></span>
                            <p>Predominantly front-end development using tools & technologies to create modern application interfaces, as well as back end development of applications on a Microsoft-based stack.</p>
                            <ul>
                                <li class="dates">November 2014 – December 2016</li>
                                <li class="tool-tag"><img src="assets/images/tools/csharp.png" alt="C#" title="C#"></li>
                                <li class="tool-tag"><img src="assets/images/tools/aspdotnetcore.png" alt="ASP.NET Core" title="ASP.NET Core"></li>
                                <li class="tool-tag"><img src="assets/images/tools/knockout.png" alt="Knockout" title="Knockout"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angularjs.png" alt="Angular.js" title="Angular.js"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular" title="Angular"></li>
                                <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript" title="JavaScript"></li>
                            </ul>
                        </td>
                    </tr>
					<tr>
						<td>
                            <h2>SpaceX Stats</h2>
                            <span><a href="https://github.com/lukeify/spacexstats">View on GitHub ⇒</a></span>
						    <p>Created and operated by myself, SpaceX Stats kept track of the progress of private spaceflight company SpaceX, offering statistics and countdowns to launches. 
							The site went through five major design iterations.</p>
                            <ul>
                                <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                                <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel" title="Laravel"></li>
                                <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer" title="Composer"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular" title="Angular"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angularjs.png" alt="Angular.js" title="Angular.js"></li>
                                <li class="tool-tag"><img src="assets/images/tools/js.png" alt="JavaScript" title="JavaScript"></li>
                                <li class="tool-tag"><img src="assets/images/tools/elastic.png" alt="ElasticSearch" title="ElasticSearch"></li>
                                <li class="tool-tag"><img src="assets/images/tools/websockets.png" alt="Websockets" title="Websockets"></li>
                                <li class="tool-tag"><img src="assets/images/tools/redis.png" alt="Redis" title="Redis"></li>
                            </ul>
                        </td>
                    </tr>
					<tr>
						<td>
                            <h2>One Rocket Road</h2>
                            <span><a href="https://github.com/lukeify/onerocketroad">View on GitHub ⇒</a></span>
						    <p>A hypothetical news application about aerospace, featuring an authoring CMS system with full markdown editing capabilities. Developed using Angular 2 with a Laravel PHP backend.</p>
                            <ul>
                                <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                                <li class="tool-tag"><img src="assets/images/tools/laravel.png" alt="Laravel" title="Laravel"></li>
                                <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer" title="Composer"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular" title="Angular"></li>
                                <li class="tool-tag"><img src="assets/images/tools/ts.png" alt="TypeScript" title="TypeScript"></li>
                            </ul>
                        </td>
                    </tr>
					<tr>
						<td>
                            <h2>Launchpad</h2>
                            <span><a href="https://github.com/lukeify/launchpad">View on GitHub ⇒</a></span>
						    <p>Built using express.js, and powered by Websockets, Launchpad provides an interface for launch updates to be streamed and pushed to users over Twitter and Reddit.</p>
                            <ul>
                                <li class="tool-tag"><img src="assets/images/tools/nodejs.png" alt="Node.js" title="Node.js"></li>
                                <li class="tool-tag"><img src="assets/images/tools/websockets.png" alt="Websockets" title="Websockets"></li>
                                <li class="tool-tag"><img src="assets/images/tools/angular.png" alt="Angular" title="Angular"></li>
                                <li class="tool-tag"><img src="assets/images/tools/ts.png" alt="TypeScript" title="TypeScript"></li>
                            </ul>
                        </td>
                    </tr>
					<tr>
						<!--<td class="apple-product iphone"></td>-->
						<td>
                            <h2>Ephemeris</h2>
                            <span><a href="https://github.com/lukeify/ephemeris">View on GitHub ⇒</a></span>
						    <p>A concept PHP API wrapper which allows users to query the Space-Track.org API, a service provided by the U.S. military for tracking orbital space debris, satellites, and rocket stages.</p>
                            <ul>
                                <li class="tool-tag"><img src="assets/images/tools/php.png" alt="PHP" title="PHP"></li>
                                <li class="tool-tag"><img src="assets/images/tools/composer.png" alt="Composer" title="Composer"></li>
                            </ul>
                        </td>
					</tr>
				</tbody>
			</table>
        </section>        
        <contact></contact>
    `
})
export class HomeComponent implements OnInit {
    public dateOfBirth: Date = new Date(1995, 6, 12);
    public instas: any[] = Array(9).fill(undefined);
    public instasLoaded = 0;

    public constructor(public lukeifyService: LukeifyService) {

    }

    /**
     *
     */
    public ngOnInit(): void {
        this.lukeifyService.getInstas().subscribe(images => {
            this.instas = images;
        });
    }

    public imageHasLoaded(): void {
        this.instasLoaded++;
    }

    /**
     * Returns my current age (at the detriment of many things).
     *
     * @returns number My current age.
     */
    public get currentAge() : number {
        const today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth = today.getMonth();
        let todayDay = today.getDate();
        let age = todayYear - this.dateOfBirth.getFullYear();

        if (todayMonth < this.dateOfBirth.getMonth() - 1)
        {
            age--;
        }

        if (this.dateOfBirth.getMonth() - 1 == todayMonth && todayDay < this.dateOfBirth.getDate())
        {
            age--;
        }

        return age;
    }
}