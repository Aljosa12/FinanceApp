import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';

// Components
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'tab-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  imports: [
    HeaderComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  ],
})
export class HistoryPage {
  constructor(private router: Router,) {}

  viewTransaction() {
    this.router.navigateByUrl('/view-transaction');
  }
}
