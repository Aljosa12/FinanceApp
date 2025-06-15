import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonNote,
  IonLabel,
  IonToolbar,
  IonTitle,
  LoadingController,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonHeader,
    IonToolbar,
    IonTitle,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RegisterPage {
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    },
    { validators: this.passwordsMatch }
  );

  passwordsMatch(formGroup: any) {
    const { password, repeatPassword } = formGroup.value;
    return password === repeatPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const loading = await this.loadingCtrl.create();
      const { email, password } = this.registerForm.value;
      loading.present();

      this.authService.register(email!, password!).then(async (user: any) => {
        loading.dismiss();

        if (user) {
          this.router.navigateByUrl('/login');
        } 
      });
    }
  }
}
