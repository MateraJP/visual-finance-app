import { Component, OnInit } from '@angular/core';
import { MenuMessageService } from './menu-message.service';

@Component({
    selector: 'app-menu-message',
    templateUrl: './menu-message.component.html',
    styleUrls: ['./menu-message.component.scss']
})
export class MenuMessageComponent implements OnInit {

    constructor(
        private menuMessageService: MenuMessageService
    ) { }

    ngOnInit(): void {
    }

    onClose(): void {
        this.menuMessageService.SlideOptions.ShowSubject.next(false);
    }
}
