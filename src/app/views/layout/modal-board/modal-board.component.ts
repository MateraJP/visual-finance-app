import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ComponentType, Modal, ModalService } from './modal.service';

@Component({
    selector: 'app-modal-board',
    templateUrl: './modal-board.component.html',
    styleUrls: ['./modal-board.component.scss']
})
export class ModalBoardComponent implements OnInit {
    @ViewChild("modalContainer", { read: ViewContainerRef }) container: ViewContainerRef;
    public modal: Modal = new Modal();
    public closed = true;
    public safeHtml: SafeHtml
    private componentRef: ComponentRef<any>;

    constructor(
        private modalService: ModalService,
        private sanitized: DomSanitizer,
        private resolver: ComponentFactoryResolver) { }

    ngOnInit(): void {
        this.modalService.control.subscribe({
            next: this.onShow.bind(this)
        })
        this.modalService.creator.subscribe({
            next: this.loadModal.bind(this)
        })
    }

    onShow(modal: Modal): void {
        this.modal = modal;
        this.closed = false;
        if (this.modal.html) {
            this.safeHtml = this.sanitized.bypassSecurityTrustHtml(this.modal.html);
        }
    }

    loadModal<T>(data: any) {
        //modal: Modal, componentType: ComponentType<T>
        const factory = this.resolver.resolveComponentFactory<T>(data.componentType);
        this.componentRef = this.container.createComponent(factory);
		
        this.modal = data.modal;
		this.componentRef.instance.data = this.modal.data;
		this.componentRef.instance.onClose = this.onClose.bind(this);
        this.closed = false;
    }

    onClose(): void {
        if (this.modal.canClose) {
            this.container.clear()
            this.closed = true;
        }
    }

    callCallback(index: number) {
        if (this.modal.actions[index] && this.modal.actions[index].callback)
            this.modal.actions[index].callback();
        
        this.container.clear()
        this.closed = true; 
    }
}
