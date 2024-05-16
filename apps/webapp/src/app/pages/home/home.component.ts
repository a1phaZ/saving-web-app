import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  BalanceComponent,
  BlockHeaderComponent,
  ContentBlockComponent,
  HorizontalContainerComponent,
  ListItemComponent,
  ModalService,
  PageContainerComponent,
  TActionButton,
  TListItem,
} from '@tg-web-app/ui';
import { Select, Store } from '@ngxs/store';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { TListAction } from 'ui/src/lib/types/list-action.type';
import { AppState } from '../../store/app/app.state';
import { WalletState } from '../../store/wallet/wallet.state';
import { Router } from '@angular/router';
import { WalletGet } from '../../store/wallet/wallet.action';
import { WalletService } from '../../services/wallet.service';
import { TransactionState } from '../../store/transaction/transaction.state';
import { TransactionGet } from '../../store/transaction/transaction.action';

const components = [
  PageContainerComponent,
  BalanceComponent,
  HorizontalContainerComponent,
  ActionButtonComponent,
  ContentBlockComponent,
  BlockHeaderComponent,
  ListItemComponent,
];

@Component({
  selector: 'webapp-home',
  standalone: true,
  imports: [CommonModule, ...components],
  providers: [ModalService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  public appStoreName = 'home';

  @Select(WalletState.WalletsList) walletsList$!: Observable<TListItem[]>;
  @Select(TransactionState.TransactionList) transactionList$!: Observable<
    TListItem[]
  >;
  private _router = inject(Router);
  private _store = inject(Store);
  private _walletService = inject(WalletService);
  private _destroy$ = new Subject<void>();
  public total$ = this._walletService.getTotal();

  public actionButtons$: Observable<TActionButton[]> = this._store
    .select(AppState.ActionButtons)
    .pipe(
      map((fn) => fn(this.appStoreName)),
      takeUntil(this._destroy$)
    );

  public listActions$: Observable<TListAction[]> = this._store
    .select(AppState.ListActions)
    .pipe(
      map((fn) => fn(this.appStoreName)),
      takeUntil(this._destroy$)
    );

  public ngOnInit(): void {
    this._store.dispatch(new WalletGet());
    this._store.dispatch(new TransactionGet());

    // this.walletsList$.pipe()
  }

  public test() {
    console.log('test');
  }

  public async itemClick(item: TListItem): Promise<void> {
    if (item.type === 'wallet') {
      await this._router.navigate(['wallet', item.id]);
      return;
    }
    if (item.type === 'action') {
      await this._router.navigate([item.path]);
      return;
    }
  }

  public async actionButtonClick({
    path,
    data,
  }: {
    path: string;
    data?: any;
  }): Promise<void> {
    await this._router.navigate([path], { queryParams: data });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
