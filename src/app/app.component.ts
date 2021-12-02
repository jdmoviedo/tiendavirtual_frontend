import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  ai: any;

  options: AnimationOptions = {
    path: '../assets/img/animations/carga.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    this.ai = animationItem;
  }
}
