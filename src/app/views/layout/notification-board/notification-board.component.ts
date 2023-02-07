import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-notification-board',
    templateUrl: './notification-board.component.html',
    styleUrls: ['./notification-board.component.scss']
})
export class NotificationBoardComponent implements OnInit {

    constructor(
        public notificationService: NotificationService
    ) { }

    ngOnInit(): void {
    }
 
    onClose(index: number) {
        this.notificationService.remove(index);
    }
}
 