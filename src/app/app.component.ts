import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  addCircleOutline,
  addOutline,
  barChartOutline,
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
  constructor(private dbService: DatabaseService) {
    addIcons({
      addCircleOutline,
      addOutline,
      barChartOutline,
      person,
      personAdd,
      readerOutline,
      removeOutline,
    });

    // Initialize Firebase app
    initializeApp(environment.firebase);
  }

  ngOnInit() {
    this.dbService.addTransaction('Aljoša', 'Hello today is a good day');

    setTimeout(() => {
      const tran = this.dbService.getTransactions();

      console.log('see transactions', tran);
    }, 10000);
  }
}
