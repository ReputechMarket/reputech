import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { postConversationRequest, postMessageRequest } from '@app/conversations/data-access/store/conversations.actions';
import { getConversationById, getConversationByNoticeId } from '@app/conversations/data-access/store/conversations.selectors';
import { ConversationRequest } from '@app/shared/models/conversation/conversation-request.model';
import { Conversation } from '@app/shared/models/conversation/conversation.model';
import { MessageRequest } from '@app/shared/models/message/message-request';
import { Notice } from '@app/shared/models/notice/notice.model';
import { loadUserByIdRequest } from '@app/users/data-access/store/users.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-conversation-create',
  templateUrl: './conversation-create.component.html',
  styleUrl: './conversation-create.component.css'
})
export class ConversationCreateComponent {
  @Output() toggleMessagePopup$ = new EventEmitter();
  @Input({required: true}) notice!: Notice;
  @Input({required: true}) senderId!: number;
  @Input({required: true}) recipientId! : number;

  constructor( private formBuilder: FormBuilder, private store : Store) {}

  messageFormGroup = this.formBuilder.group({
    text: '',
    senderId: -1,
    conversationId: -1
  })


   onConversationSubmit() {
    const conversationFormGroup = this.formBuilder.group({
      noticeId: this.notice?.id,
      name: this.notice?.title,
      buyerId: this.senderId,
      SellerId: this.recipientId,
      messageRequest: this.messageFormGroup
    })

    const conversationRequest = conversationFormGroup.value as ConversationRequest;
    this.store.dispatch(postConversationRequest({ request: conversationRequest }));
  }
}
