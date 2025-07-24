import { Component, effect } from '@angular/core';
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
  transactions = this.dbService.getTransactions();
  transactionsForView: any;
  balance: number = 0;

  constructor(
    private router: Router,
    private dbService: DatabaseService,
  ) {
    effect(() => {
      this.balance = 0;
      const txs = this.transactions();

      this.transactionsForView = txs.map((transaction) => ({
        ...transaction,
        currentBalance:
          transaction.type === 'income'
            ? Math.round(this.balance + transaction.amount * 100) / 100
            : Math.round(this.balance - transaction.amount * 100) / 100,
      }));

      this.transactionsForView = txs.map((transaction) => {
        if (transaction.type === 'income') {
          const sum = this.balance + transaction.amount;
          this.balance = Math.round(sum * 100) / 100;
        } else if (transaction.type === 'expense') {
          const sum = this.balance - transaction.amount;
          this.balance = Math.round(sum * 100) / 100;
        }

        return {
          ...transaction,
          currentBalance: this.balance,
        };
      });
    });
  }

  viewTransaction(transaction: Transaction) {
    this.router.navigate(['/view-transaction', transaction.id]);
  }
}
