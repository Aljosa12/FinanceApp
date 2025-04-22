import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { addCircleOutline, addOutline, barChartOutline, person, personAdd, readerOutline, removeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({ addCircleOutline, addOutline, barChartOutline, person, personAdd, readerOutline, removeOutline });

    // Initialize Firebase app
    initializeApp(environment.firebase);
  }
}