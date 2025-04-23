import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonHeader,
  LoadingController,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonContent],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

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
