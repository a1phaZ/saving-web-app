import { Injectable } from '@angular/core';
import { BillService } from './bill.service';
import { Observable, of } from 'rxjs';
import { Bill, IBill } from '@tg-web-app/entity';

@Injectable({
  providedIn: 'root',
})
export class MockBillService extends BillService {
  constructor() {
    super();
  }

  override getBills(): Observable<any> {
    return of(
      BILLS.sort((a, b) => a.PayDay - b.PayDay).map(this.responseToBill)
    );
  }

  override addBill(data: IBill & { _id: string }): Observable<Bill> {
    return of(this.responseToBill(data));
  }
}

const BILLS: Array<IBill & { _id: string }> = [
  {
    Id: 'f62a32eb54935379614431540742531c14afea08',
    Title: 'Comic Book Villains',
    Active: false,
    Owner: 24195154,
    PayDay: 6,
    Description: '172 Kinsman Trail',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: 'f62a32eb54935379614431540742531c14afea08',
  },
  {
    Id: 'a78e3c9ec6e4ba6208256cc4d6b9de5c2135e397',
    Title: "Porky's Revenge",
    Active: false,
    Owner: 91779406,
    PayDay: 20,
    Description: '71646 Tennyson Street',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: 'a78e3c9ec6e4ba6208256cc4d6b9de5c2135e397',
  },
  {
    Id: '2d0fd818b68f83edadcaac294f8cc93c7f375303',
    Title: 'Quantum of Solace',
    Active: false,
    Owner: 61263541,
    PayDay: 11,
    Description: '9 Manitowish Trail',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: '2d0fd818b68f83edadcaac294f8cc93c7f375303',
  },
  {
    Id: '16df3bc8055e84857a76fdce9740d40214bb1240',
    Title: 'Keoma',
    Active: true,
    Owner: 77564014,
    PayDay: 4,
    Description: '6 Dawn Trail',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: '16df3bc8055e84857a76fdce9740d40214bb1240',
  },
  {
    Id: 'dec373845a1d2835d637e7e7b8253e2adc6589ac',
    Title: 'Stevie Nicks: Live at Red Rocks',
    Active: false,
    Owner: 14174500,
    PayDay: 23,
    Description: '1842 Ilene Trail',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: 'dec373845a1d2835d637e7e7b8253e2adc6589ac',
  },
  {
    Id: 'ca153e1ade116c8f7ee8033a8c6f78ba0cc934af',
    Title: 'Burnt by the Sun 2 (Utomlyonnye solntsem 2)',
    Active: false,
    Owner: 22836698,
    PayDay: 26,
    Description: '13 Blue Bill Park Pass',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: 'ca153e1ade116c8f7ee8033a8c6f78ba0cc934af',
  },
  {
    Id: '7db334da81ee95c73f1080c59f44fac65fed67b1',
    Title: 'Kommissarie Späck',
    Active: true,
    Owner: 40702301,
    PayDay: 7,
    Description: '35668 Boyd Way',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: '7db334da81ee95c73f1080c59f44fac65fed67b1',
  },
  {
    Id: 'c4be0a5c8231513ebac899f8d0d04e374eff1c08',
    Title: "Who Is Harry Nilsson (And Why Is Everybody Talkin' About Him?)",
    Active: true,
    Owner: 66945347,
    PayDay: 4,
    Description: '3 Lotheville Road',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: 'c4be0a5c8231513ebac899f8d0d04e374eff1c08',
  },
  {
    Id: 'ba502a6ddb27ea862776245f051437943a7f325e',
    Title: 'Bandaged',
    Active: false,
    Owner: 80084465,
    PayDay: 1,
    Description: '616 Schurz Circle',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: 'ba502a6ddb27ea862776245f051437943a7f325e',
  },
  {
    Id: '43109625cc1c10e855eafd0b436b7bc36c3cfe9b',
    Title: 'Alive Day Memories: Home from Iraq (Occupation Iraq)',
    Active: true,
    Owner: 30793493,
    PayDay: 26,
    Description: '578 Oneill Center',
    StopDate: new Date(),
    Status: 'active',
    Sum: 100,
    Period: 30,
    _id: '43109625cc1c10e855eafd0b436b7bc36c3cfe9b',
  },
];
