import { Injectable } from '@angular/core';
import { NotificationModel } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: NotificationModel[] = [];
    private timeout: number = 5
    
    constructor() { }

    show(type: 'success' | 'info' | 'warning' | 'danger', message: string): void {
        var notification = new NotificationModel({
            type: type,
            message: message
        });

        notification.SlideOptions.initialState = "hide"
        notification.SlideOptions.delay = 100;
        notification.SlideOptions.timer = this.timeout * 1000;

        this.notifications.push(notification);
        
        setTimeout(() => {
            //notification.SlideOptions.ShowSubject.next(true);
            
            setTimeout(() => {
                this.notifications.splice(this.notifications.indexOf(notification), 1)
            }, ((this.timeout + 0.5) * 1000))
        }, 200)
    }

    remove(index: number): void {
        this.notifications[index].SlideOptions.ShowSubject.next(false);
        
        setTimeout(() => {
            this.notifications.splice(index, 1)
        }, 500)
    }

    claer(): void {
        this.notifications.forEach(notification => {
			notification.SlideOptions.ShowSubject.next(false);
		}) 
        
		setTimeout(() => {
			this.notifications = [];
		}, 100)
    }

    setTimeInSeconds(time: number) {
        this.timeout = time;
    }
}
