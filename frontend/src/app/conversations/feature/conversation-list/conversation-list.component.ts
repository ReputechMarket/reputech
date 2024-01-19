import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getConversations } from '@app/conversations/data-access/store/conversations.selectors';
import { Conversation } from '@app/shared/models/conversation/conversation.model';
import { Message } from '@app/shared/models/message/message';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent {
  public conversations$ = this.store.select(getConversations);
  public selectedConversationId?: number;  
  

  constructor(private store: Store, private formBuilder: FormBuilder) {
  }

  unselectConversation() {
    this.selectedConversationId = undefined;
  }

}