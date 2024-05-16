import { Component, inject, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTgPage } from '../base/base-tg-page/base-tg-page';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest, map, Observable, Subject, switchMap } from 'rxjs';
import { WalletState } from '../../store/wallet/wallet.state';
import {
  BalanceComponent,
  BlockHeaderComponent,
  ContentBlockComponent,
  HorizontalContainerComponent,
  ListItemComponent,
  PageContainerComponent,
  TListItem,
} from '@tg-web-app/ui';
import { Wallet } from '@tg-web-app/entity';
import { TransactionState } from '../../store/transaction/transaction.state';

@Component({
  selector: 'webapp-wallet-info',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    BalanceComponent,
    BlockHeaderComponent,
    ContentBlockComponent,
    HorizontalContainerComponent,
    ListItemComponent,
  ],
  templateUrl: './wallet-info.component.html',
  styleUrl: './wallet-info.component.scss',
})
export class WalletInfoComponent extends BaseTgPage implements OnInit {
  public override appStoreName = 'wallet.info';
  override MainButtonText = 'Button';
  private _router = inject(Router);
  private _zone = inject(NgZone);
  private _route = inject(ActivatedRoute);
  public pageContent$ = this._route.params.pipe(
    switchMap(({ id }) => {
      return combineLatest([this._walletInfo(id), this._transactionList(id)]);
    }),
    map(([wallet, transactions]) => ({ wallet, transactions }))
  );
  private _store = inject(Store);
  public wallet$: Observable<Wallet | undefined> = this._route.params.pipe(
    switchMap(({ id }) =>
      this._store.select(WalletState.WalletInfo).pipe(map((fn) => fn(id)))
    )
  );
  private _destroy$ = new Subject<void>();

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override MainButtonFn(): void {
    throw new Error('Method not implemented.');
  }

  override BackButtonFn(): void {
    this._zone.run(() => {
      this._router.navigate(['/']);
    });
  }

  itemClick($event: TListItem) {
    console.log($event);
  }

  private _walletInfo(id: string) {
    return this._store.select(WalletState.WalletInfo).pipe(map((fn) => fn(id)));
  }

  private _transactionList(id: string) {
    return this._store
      .select(TransactionState.TransactionListByWallet)
      .pipe(map((fn) => fn(id)));
  }
}
