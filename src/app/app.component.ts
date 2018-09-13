import { Component } from '@angular/core';
import {CustomerModel} from './model/customer-model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  customers: Observable<CustomerModel[]>;

  constructor(db: AngularFirestore) {
    this.customers = db.collection<CustomerModel>('customers').valueChanges();
  }
}
