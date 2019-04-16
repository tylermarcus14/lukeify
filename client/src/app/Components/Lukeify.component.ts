import {Component} from '@angular/core';
import {Router, NavigationStart, Event} from '@angular/router';
import {PageScrollConfig} from 'ngx-page-scroll';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'body',
    template: `
        <header>
            <nav>
                <ul id="nav-left">
                    <li>
                        <a class="header-link" pageScroll href="#skillset"
                           [pageScrollOffset]="100" routerLink="/" fragment="skillset">Skillset</a>
                    </li>
                    <li>
                        <a class="header-link" pageScroll href="#portfolio"
                           [pageScrollOffset]="100" routerLink="/" fragment="portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a class="header-link" pageScroll href="#get-in-touch"
                           [pageScrollOffset]="100" routerLink="/" fragment="get-in-touch">Get In Touch</a>
                    </li>
                    <li>
                        <a class="header-link" href="http://blog.lukeify.com">Blog</a>
                    </li>
                </ul>
                <ul id="nav-right">
                    <li><a href="https://www.linkedin.com/in/luke-davia-04728166/"
                           target="_blank"><img src="assets/images/icons/linkedin.png" /></a></li>
                    <li><a href="https://github.com/lukeify"
                           target="_blank"><img src="assets/images/icons/github.png" /></a></li>
                    <li><a href="https://twitter.com/lukeifynz"
                           target="_blank"><img src="assets/images/icons/twitter.png" /></a></li>
                    <li><a href="https://instagram.com/lukeifynz"
                           target="_blank"><img src="assets/images/icons/instagram.png" /></a></li>
                    <li><a href="https://vsco.co/lukeify"
                           target="_blank"><img src="assets/images/icons/vsco.png" /></a></li>
                </ul>
            </nav>
        </header>

        <div class="wrapper">
            <router-outlet></router-outlet>
        </div>

       	<footer>
       	    <lukeify-twitter-feed></lukeify-twitter-feed>
        </footer>
    `
})
export class LukeifyComponent {

    public isAtHome = false;
    public currentPage: string;

    constructor(public router: Router) {
        PageScrollConfig.defaultDuration = 800;
        PageScrollConfig.defaultEasingLogic = {
            ease: (t: number, b: number, c: number, d: number): number => {
                t /= d / 2;
                if (t < 1) { return c / 2 * t * t + b; }
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
        };

        router.events.pipe(
            filter((e: Event) => e instanceof NavigationStart)
        ).subscribe((e: NavigationStart) => {
            this.currentPage = e.url;
            this.isAtHome = e.url === '/' || e.url === '/#skillset' || e.url === '/#portfolio' || e.url === '/#get-in-touch';
        });
    }
}
