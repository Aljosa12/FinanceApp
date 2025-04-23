import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonIcon,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.page.html',
  styleUrls: ['./view-transaction.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonIcon,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ViewTransactionPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.pop();
  }
}
