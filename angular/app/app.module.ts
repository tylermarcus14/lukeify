import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, routedComponents} from "./app.routes";
import {LukeifyComponent}   from './Components/Lukeify.component';
import {ContactComponent} from "./Components/Contact.component";
import {LukeifyService} from "./Services/LukeifyService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TwitterFeedComponent} from "./Components/TwitterFeed.component";
import {SanitizePipe} from "./Pipes/SanitizePipe.pipe";
//import {TerminalComponent} from "./Components/Terminal.component";
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [NgxPageScrollModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, routing],
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