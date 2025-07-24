import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonTitle,
  IonToolbar,
  LoadingController,
} from '@ionic/angular/standalone';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage implements OnInit {
  userEmail: string = '';

  constructor(
    private authService: AuthenticationService,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((user) => {
      console.log(user);

      if(user?.email) {
        this.userEmail = user.email;
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

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
