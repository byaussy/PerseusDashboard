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

  constructor(private api: FirestoreService) {
    this.transactions$ = api.getTransactions();
    this.transactions$.pipe(takeUntil(this.unsubscribe)).subscribe(trans => {
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
                if (t.offer.state === 'purchased' || t.offer.state === 'return') {
                  switch (t.offer.name) {
                    case 'Smart Tablet': {
                      this.youngFemaleA++;
                      break;
                    }
                    case 'TV Series': {
                      this.youngFemaleB++;
                      break;
                    }
                  }
                }
                break;
              }
              case 'male': {
                if (t.offer.state === 'purchased' || t.offer.state === 'return') {
                  switch (t.offer.name) {
                    case 'Game Console': {
                      this.youngMaleA++;
                      break;
                    }
                    case 'Smart Phone 8': {
                      this.youngMaleB++;
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
                if (t.offer.state === 'purchased' || t.offer.state === 'return') {
                  switch (t.offer.name) {
                    case 'Framed Blue Textile': {
                      this.oldFemaleA++;
                      break;
                    }
                    case 'Cookbook': {
                      this.oldFemaleB++;
                      break;
                    }
                  }
                }
                break;
              }
              case 'male': {
                if (t.offer.state === 'purchased' || t.offer.state === 'return') {
                  switch (t.offer.name) {
                    case 'Coffee Bar': {
                      this.oldMaleA++;
                      break;
                    }
                    case '6 Burner Gas Grill': {
                      this.oldMaleB++;
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
      this.transactions = trans.sort((a: CustomerTransaction, b: CustomerTransaction) => {
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
