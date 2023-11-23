import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getNoticeById } from '@app/notices/data-access/store/notices.selectors';
import { Notice } from '@app/shared/models/notice.model';
import { Product } from '@app/shared/models/product.model';
import { User } from '@app/shared/models/user.model';
import { UsersApiService } from '@app/users/data-access/services/users-api.service';
import { loadUserByIdRequest } from '@app/users/data-access/store/users.actions';
import { getCurrentlyShownUser, getUserId} from '@app/users/data-access/store/users.selectors';
import { UsersService } from '@app/users/utils/services/users.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent{
  id = this.route.snapshot.paramMap.get('id');
  notice$ = this.store.select(getNoticeById(+this.id!));
  creator$ = this.store.select(getCurrentlyShownUser);
  selectedProduct? : Product; 
  currentUserId$ = this.store.select(getUserId);

  constructor(private store: Store<{notices: Notice[]}>, private route: ActivatedRoute) {
    this.notice$.subscribe(notice => {
      if (notice) {
        this.store.dispatch(loadUserByIdRequest({id: notice.userId}))
        this.selectedProduct = notice.products[0]
      }
    })
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getTotalPrice(notice: Notice) {
    return notice?.products.reduce((sum, product) => sum + product.price, 0);
  }
}
