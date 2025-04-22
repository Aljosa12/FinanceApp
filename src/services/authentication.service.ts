import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve(signInWithEmailAndPassword(this.auth, email, password));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve(createUserWithEmailAndPassword(this.auth, email, password));
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      resolve(signOut(this.auth));
    });
  }

  getCurrentUser(): Promise<User | null> {
    const auth = getAuth();
  
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // stop listening after first response
        resolve(user); // return the user (or null if not signed in)
      }, reject);
    });
  }
}
