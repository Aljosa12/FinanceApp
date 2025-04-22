import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'tab-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, ExploreContainerComponent]
})
export class HistoryPage {

  constructor() {}

}
