import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';
import { format } from 'date-fns';

// Components
import { HeaderComponent } from 'src/app/components/header/header.component';

// Services
import { DatabaseService } from 'src/services/db.service';

// Interfaces
export interface Transaction {
  type: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}

@Component({
  selector: 'tab-add-transaction',
  templateUrl: 'add-transaction.page.html',
  styleUrls: ['add-transaction.page.scss'],
  imports: [
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
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ReactiveFormsModule,
  ],
})
export class AddTransactionPage {
  transactionForm!: FormGroup;
  constructor(private dbService: DatabaseService, private fb: FormBuilder) {}

  ngOnInit() {
    const today = format(new Date(), 'yyyy-MM-dd');

    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: [''],
      note: [''],
      date: [today, Validators.required],
    });
  }

  async addTransaction() {
    const formData = this.transactionForm.value;
    const transaction: Transaction = {
      type: formData.type,
      amount: formData.amount,
      category: formData.category,
      note: formData.note,
      date: formData.date,
    };

    await this.dbService.addTransaction(transaction).then(() => {
      this.transactionForm.reset();
    });
  }
}
