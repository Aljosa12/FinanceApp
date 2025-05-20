import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  async canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // const auth = getAuth();
      // const user = auth.currentUser;

      // this.authService.getCurrentUser().then((user) => {
      //   console.log(user)
      //   if (user) {
          resolve(true);
        // } else {
        //   this.router.navigateByUrl('/login');
        //   resolve(false);
        // }
      // });
      
    });
  }
}
