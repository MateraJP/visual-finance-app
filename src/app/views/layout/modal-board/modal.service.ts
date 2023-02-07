import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ComponentType<T> = new (...args: any[]) => T;
export class Modal {
    actions: ModalAction[] = [
        {
            style: 'primary',
            icon: undefined,
            text: 'Ok',
            callback: undefined
        }
    ];
    title: string;
    message: string;
    html: string
    canClose: boolean = true;
    data: any;

    constructor(init?: Partial<Modal>) {
        Object.assign(this, init);
    }
}

export class ModalAction {
    style: 'primary' | 'secundary';
    icon: string;
    text: string;
    callback: any;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    control = new Subject<Modal>();
    creator = new Subject<any>();
    private closed = true;
    private canClose = true;
    
    constructor() { }

    show(modal: Modal): void {
        this.control.next(modal);
    }

    create<T>(modal: Modal, componentType: ComponentType<T>) {
        this.creator.next({ modal, componentType});
    }

    onClose(): void {
        if(this.canClose) {
            this.closed = true;
        }
    }
}
