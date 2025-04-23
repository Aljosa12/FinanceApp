import { Component } from '@angular/core';
import {
  IonDatetime,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonItem,
  IonList,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';

// Components
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'tab-add-transaction',
  templateUrl: 'add-transaction.page.html',
  styleUrls: ['add-transaction.page.scss'],
  imports: [
    HeaderComponent,
    IonDatetime,
    IonLabel,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonItem,
    IonList,
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class AddTransactionPage {
  constructor() {}
}
