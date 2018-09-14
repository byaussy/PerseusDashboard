import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/Observable';
import {CustomerModel, CustomerOffer, CustomerTransaction} from '../model/customer-model';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';

@Injectable()
export class FirestoreService {

  constructor(private db: AngularFirestore) {
  }

  getCustomers(): Observable<CustomerModel[]> {
    return this.db.collection<CustomerModel>('customers').valueChanges().pipe(tap(c => console.log(`fetched customers`, c)));
  }

  getTransactions(): Observable<CustomerTransaction[]> {
    return this.db.collection<CustomerTransaction>('transactions').valueChanges().pipe(tap(c => console.log(`fetched transactions`, c)));
  }

  getPurchasesByCustomer(id: string): Observable<CustomerOffer[]> {
    return this.db.collection<CustomerOffer>(`customers/${id}/offers`).valueChanges().pipe(tap(c => console.log(`fetched offers`, c)));
  }

}
