import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonToolbar,
  IonTitle,
  IonContent,
  LoadingController,
} from '@ionic/angular/standalone';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel,
    IonNote,
    IonHeader,
    IonToolbar,
    IonTitle,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LostPasswordPage {
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {}

  lostPasswordForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
    },
  );


  async onSubmit() {
    if (this.lostPasswordForm.valid) {
      const { email } = this.lostPasswordForm.value;

      const loading = await this.loadingCtrl.create();
      loading.present();

      this.authService.forgotPassword(email!).then(async (user: any) => {
        loading.dismiss();

        if (user) {
          // const toast = await this.toastCtrl.create({
          //   message: 'Login successful!',
          //   duration: 2000,
          // })
          // toast.present()

          this.router.navigateByUrl('/login');
        } 
      });
    }
  }
}
