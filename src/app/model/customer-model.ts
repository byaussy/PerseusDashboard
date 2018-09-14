import {Timestamp} from 'firebase/firestore';

export class CustomerModel {
  addedDate: Date;
  customerType: string;
  age: string;
  dwell_time: string;
  faceId: string;
  gender: string;
  id: string;
  identityName: string;
  lastUpdated: Timestamp;
  lastUpdatedDateTime: Date;
  mood: string;
  name: string;
  registrationToken: string;
  offers: CustomerOffer[];
  selectedOffer: CustomerOffer;
  age_group: string;
}

export class CustomerOffer {
  age: string;
  ageMax: string;
  ageMin: string;
  barcode: string;
  desc: string;
  gender: string;
  id: string;
  name: string;
  price: string;
  refId: string;
  state: string;
  uri: string;
}

export class CustomerTransaction {
  customer: CustomerModel;
  offer: CustomerOffer;
  timestamp: Timestamp;
  datetime: Date;
}
