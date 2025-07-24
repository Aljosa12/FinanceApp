import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { format } from 'date-fns';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonIcon,
  IonToolbar,
} from '@ionic/angular/standalone';

// Components
import { HeaderComponent } from 'src/app/components/header/header.component';

// Services
import { DatabaseService, Transaction } from 'src/services/db.service';

// Pages
import { ProfilePage } from 'src/app/profile/profile.page';
import { SettingsPage } from 'src/app/settings/settings.page';
import { HelpAboutPage } from 'src/app/help-about/help-about.page';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.page.html',
  styleUrls: ['./view-transaction.page.scss'],
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonIcon,
    IonToolbar,
  ],
})
export class ViewTransactionPage implements OnInit {
  transaction: any;

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    public navCtrl: NavController
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.transaction = await this.dbService.getTransaction(id);
    console.log('This transaction: ', this.transaction);
  }

  goBack() {
    this.navCtrl.pop();
  }
}
