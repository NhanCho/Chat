import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatService } from './service/chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat';

  message$!: Observable<any>
  message: any[] = []
  userName!: string
  newRoom!: string
  newMessage!: string

  constructor(private chatService: ChatService) { }

  sendMessage() {
    let newMsg = {
      from: this.userName,
      msg: this.newMessage,
      roomID: this.newRoom
    }
    this.chatService.sendMessage(newMsg);
  }

  joinRoom() {
    this.message$ = this.chatService.getMessage(this.newRoom);
    this.message$.subscribe((msg: any) => {
      this.message.push(msg);
    })
  }
}
