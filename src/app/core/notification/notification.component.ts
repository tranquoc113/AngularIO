import {Component, Input, OnInit} from '@angular/core';
import {NotifyMessage} from '../model/notify-message';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input('openNotify') isOpenNotify: boolean = false;
  @Input('openChat') isOpenChat: boolean = false;

  messages: NotifyMessage[] = [] ;
  isShowLoading: boolean = false;
  scrollCallback: Function;
  chatTabIndex: number = 0;

  constructor() {
  }

  ngOnInit() {

  }


  onSelectedChatTabChange(event: MatTabChangeEvent) {
    this.chatTabIndex =  event.index;
  }

}
