import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {LukeifyService} from '../Services/LukeifyService';

@Component({
    'selector': 'lukeify-instagram',
    'template': `
        <p id="insta-label">The latest from my Instagram...</p>
        <ul>
            <li *ngFor="let insta of instas">
                <a *ngIf="insta !== undefined" [href]="'https://instagram.com/p/' + insta.shortcode"
                   target="_blank" [title]="insta.caption">
                        <span class="like-data">
                            <svg class="like-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path
                                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
                            <span class="like-count">{{ insta.likes }}</span>
                        </span>
                    <img [src]="insta.thumb" [alt]="insta.caption" (load)="imageHasLoaded()">
                </a>
            </li>
        </ul>
    `
})
export class InstagramComponent implements OnInit {
    public instas: any[] = Array(9).fill(undefined);
    public instasLoaded = 0;

    @Output() public emitHeight : EventEmitter<number> = new EventEmitter<number>();

    public constructor(public element: ElementRef, public lukeifyService: LukeifyService) {}

    /**
     *
     */
    public ngOnInit(): void {
        this.lukeifyService.getInstas().subscribe(images => {
            this.instas = images;
        });
    }

    /**
     *
     */
    public imageHasLoaded(): void {
        if (this.instasLoaded < 9) {
            this.instasLoaded++;
        }
        if (this.instasLoaded === 9) {
            this.emitHeight.emit(this.element.nativeElement.getBoundingClientRect().height);
        }
    }
}