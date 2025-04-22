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
} from '@ionic/angular/standalone';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage {
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },
  );


  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email!, password!);
        const toast = await this.toastCtrl.create({
          message: 'Login successful!',
          duration: 2000,
        })
        toast.present().then(()=> {
          this.router.navigateByUrl('');
        });;
      } catch (err: any) {
        const toast = await this.toastCtrl.create({
          message: err.message,
          duration: 2000,
        });
        toast.present();
      }
    }
  }
}
