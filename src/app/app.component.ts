import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerTransaction} from './model/customer-model';
import {Observable} from 'rxjs/Observable';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {FirestoreService} from './services/firestore.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  transactions$: Observable<CustomerTransaction[]>;
  transactions: CustomerTransaction[];
  private unsubscribe: Subject<void> = new Subject();
  dateNow: Date = new Date();
  youngFemaleA = 0;
  youngFemaleB = 0;
  oldFemaleA = 0;
  oldFemaleB = 0;
  youngMaleA = 0;
  youngMaleB = 0;
  oldMaleA = 0;
  oldMaleB = 0;
  mostest = 0;
  leastest = 10000;

  constructor(private api: FirestoreService) {
    this.transactions$ = api.getTransactions();
    this.transactions$.pipe(takeUntil(this.unsubscribe)).subscribe(trans => {
      this.transactions = [];
      this.youngFemaleA = 0;
      this.youngFemaleB = 0;
      this.oldFemaleA = 0;
      this.oldFemaleB = 0;
      this.youngMaleA = 0;
      this.youngMaleB = 0;
      this.oldMaleA = 0;
      this.oldMaleB = 0;
      this.mostest = 0;
      for (const t of trans) {
        // const milliseconds = t.timestamp.seconds * 1000;
        t.datetime = moment(t.timestamp).toDate();
        if (+t.customer.age < 25) {
          t.customer.age_group = 'underage';
        } else if (+t.customer.age < 45) {
          t.customer.age_group = 'young';
        } else if (+t.customer.age < 65) {
          t.customer.age_group = 'old';
        } else {
          t.customer.age_group = 'too old';
        }
        switch (t.customer.age_group) {
          case 'young': {
            switch (t.customer.gender) {
              case 'female': {
                if (t.offer.state === 'purchased') {
                  this.transactions.push(t);
                  switch (t.offer.name) {
                    case 'Smart Tablet': {
                      this.youngFemaleA++;
                      if (this.youngFemaleA >= this.mostest) { this.mostest = this.youngFemaleA; }
                      break;
                    }
                    case 'TV Series': {
                      this.youngFemaleB++;
                      if (this.youngFemaleB >= this.mostest) { this.mostest = this.youngFemaleB; }
                      break;
                    }
                  }
                }
                break;
              }
              case 'male': {
                if (t.offer.state === 'purchased') {
                  this.transactions.push(t);
                  switch (t.offer.name) {
                    case 'Game Console': {
                      this.youngMaleA++;
                      if (this.youngMaleA >= this.mostest) { this.mostest = this.youngMaleA; }
                      break;
                    }
                    case 'Smart Phone 8': {
                      this.youngMaleB++;
                      if (this.youngMaleB >= this.mostest) { this.mostest = this.youngMaleB; }
                      break;
                    }
                  }
                }
                break;
              }
            }
            break;
          }
          case 'old': {
            switch (t.customer.gender) {
              case 'female': {
                if (t.offer.state === 'purchased') {
                  this.transactions.push(t);
                  switch (t.offer.name) {
                    case 'Framed Blue Textile': {
                      this.oldFemaleA++;
                      if (this.oldFemaleA >= this.mostest) { this.mostest = this.oldFemaleA; }
                      break;
                    }
                    case 'Cookbook': {
                      this.oldFemaleB++;
                      if (this.oldFemaleB >= this.mostest) { this.mostest = this.oldFemaleB; }
                      break;
                    }
                  }
                }
                break;
              }
              case 'male': {
                if (t.offer.state === 'purchased') {
                  this.transactions.push(t);
                  switch (t.offer.name) {
                    case 'Coffee Bar': {
                      this.oldMaleA++;
                      if (this.oldMaleA >= this.mostest) { this.mostest = this.oldMaleA; }
                      break;
                    }
                    case '6 Burner Gas Grill': {
                      this.oldMaleB++;
                      if (this.oldMaleB >= this.mostest) { this.mostest = this.oldMaleB; }
                      break;
                    }
                  }
                }
                break;
              }
            }
            break;
          }
        }
      }
      this.leastest = this.youngFemaleA;
      if (this.youngFemaleB < this.leastest) { this.leastest = this.youngFemaleB; }
      if (this.youngMaleA < this.leastest) { this.leastest = this.youngMaleA; }
      if (this.youngMaleB < this.leastest) { this.leastest = this.youngMaleB; }
      if (this.oldFemaleA < this.leastest) { this.leastest = this.oldFemaleA; }
      if (this.oldFemaleB < this.leastest) { this.leastest = this.oldFemaleB; }
      if (this.oldMaleA < this.leastest) { this.leastest = this.oldMaleA; }
      if (this.oldMaleB < this.leastest) { this.leastest = this.oldMaleB; }
      this.transactions.sort((a: CustomerTransaction, b: CustomerTransaction) => {
        return b.timestamp - a.timestamp;
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
