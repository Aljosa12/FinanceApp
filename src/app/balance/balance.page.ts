import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { ToastController } from '@ionic/angular';
import { isSameMonth, format } from 'date-fns';

// Components
import { HeaderComponent } from 'src/app/components/header/header.component';

// Services
import { DatabaseService } from 'src/services/db.service';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'tab-balance',
  templateUrl: 'balance.page.html',
  styleUrls: ['balance.page.scss'],
  imports: [
    HeaderComponent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class BalancePage {
  public chart: any;
  transactions = this.dbService.getTransactions();
  currentMonthName: string = '';
  currentDate: string = '';
  monthlySpendAmount: number = 0;
  balance: number = 0;
  expenseCategories: any = {
    entertainment: 0,
    utility: 0,
    groceries: 0,
    restaurantsAndBar: 0,
    other: 1,
  };

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    const now = new Date();
    const month = format(now, 'MMMM');
    const constformattedDate = format(now, 'MM.dd.yyyy');

    this.currentMonthName = month;
    this.currentDate = constformattedDate;

    effect(() => {
      this.balance = 0;
      this.monthlySpendAmount = 0;
      const txs = this.transactions(); // get the current value of the signal

      txs.forEach((transaction) => {
        if (transaction.type === 'income') {
          const sum = this.balance + transaction.amount;
          this.balance = Math.round(sum * 100) / 100;
        } else if (transaction.type === 'expense') {
          const sum = this.balance - transaction.amount;
          this.balance = Math.round(sum * 100) / 100;

          switch (transaction.category) {
            case 'entertainment':
              this.expenseCategories.entertainment += transaction.amount;
              break;
            case 'utility':
              this.expenseCategories.utility += transaction.amount;
              break;
            case 'groceries':
              this.expenseCategories.groceries += transaction.amount;
              break;
            case 'restaurantsAndBar':
              this.expenseCategories.restaurantsAndBar += transaction.amount;
              break;
            default:
              this.expenseCategories.other += transaction.amount;
              break;
          }

          if (isSameMonth(transaction.date, new Date())) {
            const sum = this.monthlySpendAmount + transaction.amount;
            this.monthlySpendAmount = Math.round(sum * 100) / 100;
          }
        }
      });

      this.updateChart();
    });
  }

  ngOnInit(): void {
    this.expenseCategories = this.calculatePercentages(this.expenseCategories);
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut', // Doughnut chart type
      data: {
        labels: [
          'Entertainment',
          'Utility',
          'Groceries',
          'Restaurants & Bars',
          'Other',
        ],
        datasets: [
          {
            label: 'Dataset 1',
            data: [
              this.expenseCategories.entertainment,
              this.expenseCategories.utility,
              this.expenseCategories.groceries,
              this.expenseCategories.restaurantsAndBar,
              this.expenseCategories.other,
            ], // Data values for each segment
            backgroundColor: [
              '#0A192F',
              '#008080',
              '#FFD700',
              '#B0BEC5',
              '#1E3A8A',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
              },
            },
          },
        },
      },
    });
  }

  updateChart() {
    this.chart.data.datasets[0].data = [
      this.expenseCategories.entertainment,
      this.expenseCategories.utility,
      this.expenseCategories.groceries,
      this.expenseCategories.restaurantsAndBar,
      this.expenseCategories.other,
    ];

    this.chart.update();
  }

  calculatePercentages(obj: Record<string, number>): Record<string, number> {
    const values = Object.values(obj);
    const sum: any = values.reduce((a, b) => a + b, 0);
    if (sum === 0)
      return Object.fromEntries(Object.keys(obj).map((k) => [k, 0]));

    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        +((val / sum) * 100).toFixed(2),
      ])
    );
  }
}
