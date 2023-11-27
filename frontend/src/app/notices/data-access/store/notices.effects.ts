import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoticesApiService } from '../services/notices-api/notices-api.service';
import { ProductsApiService } from '../services/products-api/products-api.service';

import { Notice } from '@app/shared/models/notice.model';
import { catchError, map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { deleteNoticeRequest, deleteNoticeSuccess, loadNoticesError, loadNoticesRequest, loadNoticesSuccess, patchIsSoldNoticeRequest, patchIsSoldProductSuccess, postNoticeRequest, postNoticeSuccess, putNoticeRequest, putNoticeSuccess } from './notices.actions';
import { of } from 'rxjs';
import { ShowAlert } from '@app/shared/store/app.actions';
import { Update } from '@ngrx/entity';
import { Product } from '@app/shared/models/product.model';

@Injectable()
export class NoticesEffects {

    constructor(
        private noticesApiService: NoticesApiService,
        private productsApiService: ProductsApiService,
        private actions$: Actions,
        ) {}


    loadNotices$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadNoticesRequest),
            mergeMap(() => {
                return this.noticesApiService.getAllNoticesAPI().pipe(
                    map((notices) => {
                        return (loadNoticesSuccess({notices: notices}));
                    }),
                    catchError((_error) => {
                        return of(loadNoticesError({errorText: _error.message}));
                    })
                );
            })
        );
    })

    postNotice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(postNoticeRequest),
        mergeMap(action =>
            this.noticesApiService.postNoticeAPI(action.request).pipe(
                mergeMap(notice => 
                        of(
                        postNoticeSuccess({ notice: notice as Notice }),
                        ShowAlert({ message: 'Created successfully.', actionresult: 'pass' })                  
                        )
                    ),
                catchError((_error) => of(ShowAlert({ message: 'Failed to create notice.', actionresult: 'fail' }))),
                )
            )
        )
    );

    putNotice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(putNoticeRequest),
        mergeMap(action =>
            this.noticesApiService.putNoticeAPI(action.request, action.noticeId).pipe(
                mergeMap(notice => 
                        of(
                        putNoticeSuccess({ notice: notice as Notice }),
                        ShowAlert({ message: 'Updated successfully.', actionresult: 'pass' })                    
                        )
                    ),
                catchError((_error) => of(ShowAlert({ message: 'Failed to update notice.', actionresult: 'fail' }))),
                )
            )
        )
    );

    deleteNotice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(deleteNoticeRequest),
        mergeMap(action =>
            this.noticesApiService.deleteNoticeAPI(action.noticeId).pipe(
                mergeMap(() => 
                        of(
                        deleteNoticeSuccess({noticeId: action.noticeId}),
                        ShowAlert({ message: 'Deleted successfully.', actionresult: 'pass' })                    
                        )
                    ),
                catchError((_error) => of(ShowAlert({ message: 'Failed to delete notice.', actionresult: 'fail' }))),
                )
            )
        )
    );

    // Products
    patchProductIsSold$ = createEffect(() =>
    this.actions$.pipe(
        ofType(patchIsSoldNoticeRequest),
        mergeMap(action =>
            this.productsApiService.patchProductIsSoldAPI(action.productId).pipe(
                mergeMap(product => 
                        of(
                        patchIsSoldProductSuccess({ product: product as Product }),
                        ShowAlert({ message: 'Updated sold status successfully.', actionresult: 'pass' })                    
                        )
                    ),
                catchError((_error) => of(ShowAlert({ message: 'Failed to update sold status.', actionresult: 'fail' }))),
                )
            )
        )
    );
}