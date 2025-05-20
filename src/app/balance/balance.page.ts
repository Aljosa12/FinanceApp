import { Component } from '@angular/core';
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
import { getMonth, getDate } from 'date-fns';

// Components
import { HeaderComponent } from 'src/app/components/header/header.component';

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

  constructor(private router: Router, private toastCtrl: ToastController) {
    const now = new Date();

    const currentMonth = getMonth(now); // 0 = January, 11 = December
    const currentDate = getDate(now); // e.g. 20
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut', // Doughnut chart type
      data: {
        labels: [
          'Entertainment',
          'Expenses',
          'Groceries',
          'Restaurants & Bars',
          'Other',
        ],
        datasets: [
          {
            label: 'Dataset 1',
            data: [50, 30, 40, 60, 70], // Data values for each segment
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
}
