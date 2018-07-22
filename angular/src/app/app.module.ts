import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {routing, routedComponents} from "./app.routes";
import {LukeifyComponent}   from './Components/Lukeify.component';
import {ContactComponent} from "./Components/Contact.component";
import {LukeifyService} from "./Services/LukeifyService";
import {TwitterFeedComponent} from "./Components/TwitterFeed.component";
import {SanitizePipe} from "./Pipes/SanitizePipe.pipe";

@NgModule({
    imports: [NgxPageScrollModule, BrowserModule, ReactiveFormsModule, HttpClientModule, routing],
    declarations: [
        // Components
        LukeifyComponent, ContactComponent, TwitterFeedComponent, routedComponents,
        // Pipes
        SanitizePipe
    ],
    providers: [LukeifyService, HttpClient],
    bootstrap: [LukeifyComponent]
})

export class AppModule { }