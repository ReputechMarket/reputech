import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessagesApiService } from '@app/messages/data-access/service/messages-api.service';
import { connectToMessageHubRequest } from '@app/messages/data-access/store/messages.actions';
import { connectToMessageHub } from '@app/messages/data-access/store/messages.selectors';
import { Message } from '@app/shared/models/message';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnChanges{
  public messages?: Message[];

  constructor(private store: Store, private service: MessagesApiService) {
    // store.dispatch(connectToMessageHubRequest())
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.service.messages)
    this.messages = this.service.messages;
  }

  ngOnInit(): void {
    console.log(this.service.messages)
    this.messages = this.service.messages;
  }
}
