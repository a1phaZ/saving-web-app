import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { BillGet } from '../../store/bill/bill.actions';
import {
  ActionButtonComponent,
  BalanceComponent,
  BlockHeaderComponent,
  ContentBlockComponent,
  EIconName,
  HorizontalContainerComponent,
  HorizontalDividerComponent,
  ListItemComponent,
  PageContainerComponent,
  PageHeaderComponent,
  SearchComponent,
  SearchPipe,
  TextFormFieldMobileComponent,
  TListItem,
} from '@tg-web-app/ui';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { BillState } from '../../store/bill/bill.state';
import { TListAction } from '../../../../../../ui/src/lib/types/list-action.type';
import { TranslocoService } from '@ngneat/transloco';
import { EActionPathByNameResolver } from '../../models/actions/action.names';
import { Router } from '@angular/router';

@Component({
  selector: 'webapp-bill',
  standalone: true,
  imports: [
    CommonModule,
    ActionButtonComponent,
    BalanceComponent,
    BlockHeaderComponent,
    PageContainerComponent,
    ContentBlockComponent,
    HorizontalContainerComponent,
    ListItemComponent,
    HorizontalDividerComponent,
    TextFormFieldMobileComponent,
    SearchComponent,
    SearchPipe,
    PageHeaderComponent,
  ],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent implements OnInit, OnDestroy {
  @Select(BillState.BillsList) billsList$!: Observable<TListItem[]>;
  private _store = inject(Store);
  private _i18n = inject(TranslocoService);
  private _router = inject(Router);
  private _destroy$ = new Subject<void>();

  constructor() {}

  public addButton!: TListAction;
  public searchString!: string;

  public ngOnInit() {
    this._store.dispatch(new BillGet());

    this._i18n
      .selectTranslate('bill.add.title')
      .pipe(take(1), takeUntil(this._destroy$))
      .subscribe((title) => {
        this.addButton = {
          path: EActionPathByNameResolver.BILL_ADD,
          type: 'action',
          id: 'add.bill',
          title,
          icon: {
            name: EIconName.saxAddCircleOutline,
            size: '24px',
          },
        };
      });

    // this.billsList$.subscribe(console.log);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  itemClick(item: TListItem) {
    if (item?.type === 'action') {
      return this._router.navigate([EActionPathByNameResolver.BILL_ADD]);
    }
    return new Promise<boolean>((_, reject) => reject(false));
  }
}
