import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  LoadingController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage {
  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  // Logout method
  async logout(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    loading.present();

    this.authService.logout().then(async (res: any) => {
      await this.authService.logout();
      
      loading.dismiss();
      this.router.navigateByUrl('/login');
    });
  }
}
