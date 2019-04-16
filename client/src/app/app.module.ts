import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {routing, routedComponents} from './app.routes';
import {LukeifyComponent} from './Components/Lukeify.component';
import {LukeifyService} from './Services/LukeifyService';
import {TwitterFeedComponent} from './Components/TwitterFeed.component';
import {SanitizePipe} from './Pipes/SanitizePipe.pipe';
import {TerminalComponent} from './Components/Terminal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InstagramComponent} from './Components/Instagram.component';
import {InitService} from './Services/InitService';

export function initializeApp1(appInitService: InitService) {
    return (): Promise<any> => {
        return appInitService.Init();
    };
}

@NgModule({
    imports: [NgxPageScrollModule, BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, routing],
    declarations: [
        // Components
        LukeifyComponent, InstagramComponent, TerminalComponent, TwitterFeedComponent, routedComponents,
        // Pipes
        SanitizePipe
    ],
    providers: [LukeifyService, HttpClient, InitService,
        { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [InitService], multi: true}],
    bootstrap: [LukeifyComponent]
})

export class AppModule { }
