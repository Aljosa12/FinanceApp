import { Component } from '@angular/core';
import { IonDatetime, IonLabel, IonTextarea, IonSelect, IonSelectOption, IonInput, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonIcon, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'tab-add-transaction',
  templateUrl: 'add-transaction.page.html',
  styleUrls: ['add-transaction.page.scss'],
  imports: [IonDatetime, IonLabel, IonTextarea, IonSelect, IonSelectOption, IonInput, IonItem, IonList, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class AddTransactionPage {
  constructor() {}
}
