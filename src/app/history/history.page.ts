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

// Services
import { DatabaseService, Transaction } from 'src/services/db.service';

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
  transactions = this.dbService.getTransactions()

  constructor(
    private router: Router, 
    private dbService: DatabaseService
  ) {
  }

  viewTransaction(transaction: Transaction) {
    this.router.navigate(['/view-transaction', transaction.id]);
  }
}
