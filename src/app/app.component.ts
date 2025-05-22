import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  addCircleOutline,
  addOutline,
  barChartOutline,
  chevronBackOutline,
  logOutOutline,
  person,
  personAdd,
  readerOutline,
  removeOutline,
} from 'ionicons/icons';

// Services
import { DatabaseService } from 'src/services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private dbService: DatabaseService, private platform: Platform) {
    addIcons({
      addCircleOutline,
      addOutline,
      barChartOutline,
      chevronBackOutline,
      logOutOutline,
      person,
      personAdd,
      readerOutline,
      removeOutline,
    });

    // Initialize Firebase app
    initializeApp(environment.firebase);

    this.initApp();
  }

  async initApp() {
    // this.platform.ready().then(() => {
    //   // Push content below status bar
    //   StatusBar.setOverlaysWebView({ overlay: false }).then(() => {
    //     // Set white background
  
    //   });
    // });

    await this.dbService.initializePlugin();
  }
}
