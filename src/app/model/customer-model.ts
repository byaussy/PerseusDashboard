export class CustomerModel {
  addedDate: Date;
  customerType: string;
  age: number;
  dwell_time: string;
  faceId: string;
  gender: string;
  identityName: string;
  lastUpdated: Date;
  mood: string;
  name: string;
  registrationToken: string;
  offers: CustomerOffer[];
}

export class CustomerOffer {
  age: string;
  barcode: string;
  desc: string;
  price: string;
  refId: string;
  state: string;
  uri: string;
}
