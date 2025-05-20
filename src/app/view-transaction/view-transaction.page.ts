import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonIcon,
  IonToolbar,
} from '@ionic/angular/standalone';

// Services
import { DatabaseService, Transaction } from 'src/services/db.service';

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
  transaction: any;

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private navCtrl: NavController
  ) {
    
  }
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) this.transaction = await this.dbService.getTransaction(id);
    console.log('This transaction: ', this.transaction)
  }

  goBack() {
    this.navCtrl.pop();
  }
}
