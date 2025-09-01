import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  MenuController,
  ModalController,
  NavController,
} from '@ionic/angular/standalone';
import {
  IonButton,
  IonDatetime,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonItem,
  IonList,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';
import {
  addCircleOutline,
  addOutline,
  barChartOutline,
  chevronBackOutline,
  cogOutline,
  closeOutline,
  informationCircleOutline,
  logOutOutline,
  person,
  personAdd,
  readerOutline,
  removeOutline,
} from 'ionicons/icons';

// Components
import { HeaderComponent } from './components/header/header.component';

// Services
import { DatabaseService } from 'src/services/db.service';

// Pages
import { ProfilePage } from 'src/app/profile/profile.page';
import { SettingsPage } from 'src/app/settings/settings.page';
import { HelpAboutPage } from 'src/app/help-about/help-about.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    HeaderComponent,
    IonButton,
    IonDatetime,
    IonLabel,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonItem,
    IonList,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
  ],
})
export class AppComponent {
  constructor(
    private dbService: DatabaseService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {
    addIcons({
      addCircleOutline,
      addOutline,
      barChartOutline,
      closeOutline,
      chevronBackOutline,
      cogOutline,
      informationCircleOutline,
      logOutOutline,
      person,
      personAdd,
      readerOutline,
      removeOutline,
    });

    // Initialize Firebase app
    initializeApp(environment.firebase);

    this.initApp();

    this.setStatusBar();
  }

  async initApp() {
    // this.platform.ready().then(() => {
    //   // Push content below status bar
    //   StatusBar.setOverlaysWebView({ overlay: false }).then(() => {
    //     // Set white background

    //   });
    // });

    await this.dbService.initializePlugin();
  }

   async setStatusBar() {
    // Show the status bar (in case it was hidden)
    // await StatusBar.show();

    // // Change background color (optional)
    // await StatusBar.setBackgroundColor({ color: '#ffffff' });

    // // Change text/icons style
    // await StatusBar.setOverlaysWebView({ overlay: false });
    // await StatusBar.setStyle({ style: Style.Dark }); 
    // Use Style.Light for light text/icons on dark backgrounds
  }

  // PAGES ****************************************************
  async openProfile() {
    let modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'modal-fullscreen',
    });
    await modal.present();
    this.menuCtrl.close();
  }

  async openSettings() {
    let modal = await this.modalCtrl.create({
      component: SettingsPage,
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    this.menuCtrl.close();
  }

  async openHelp() {
    let modal = await this.modalCtrl.create({
      component: HelpAboutPage,
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    this.menuCtrl.close();
  }
}
