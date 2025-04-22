import { Component } from '@angular/core';
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

// Services
import { AuthenticationService } from 'src/services/authentication.service';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'tab-balance',
  templateUrl: 'balance.page.html',
  styleUrls: ['balance.page.scss'],
  imports: [
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

  constructor(
    private authService: AuthenticationService,
    private toastCtrl: ToastController
  ) {}

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

  // Logout method
  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      const toast = await this.toastCtrl.create({
        message: 'Logout successful!',
        duration: 2000,
      });
      toast.present();
    } catch (err: any) {
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
      });
      toast.present();
    }
  }
}
