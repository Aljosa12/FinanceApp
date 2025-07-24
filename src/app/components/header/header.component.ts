import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonicModule 
} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonicModule 
  ],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() contentId: string = 'main-content';

  constructor(
  ) {}

  ngOnInit() {}
}
