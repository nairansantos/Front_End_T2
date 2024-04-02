import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, BrowserModule,
        HttpClientModule, DynamicFormComponent]
})
export class AppComponent {
  title = 'dynamic-form-app';
}
