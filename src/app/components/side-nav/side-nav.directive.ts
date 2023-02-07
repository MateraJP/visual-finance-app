import {
    Directive,
    Input,
    ElementRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    Injector,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { SlideOptions } from './slide-options.model';

/**
 * slide any component to screen and offscreen
 */
@Directive({
    selector: '[slideOptions]'
})
export class SlideDirective implements OnInit, OnDestroy {
    @Input() slideOptions: SlideOptions;

    private element: HTMLInputElement;
    private originalTranform: string;
    private originalTransition: string;

    constructor(
        injector: Injector,
        private el: ElementRef,
        private viewContainer: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.element = el.nativeElement;

    }

    ngOnInit(): void {
        this.originalTranform = (this.element.style.transform && this.element.style.transform.length > 0) ? (this.element.style.transform + ',') : '';
        this.originalTransition = (this.element.style.transition && this.element.style.transition.length > 0) ? (this.element.style.transition + ',') : '';

        if (this.slideOptions.ShowSubject) {
            this.slideOptions.ShowSubject.subscribe({
                next: (show: boolean) => {
                    if (show) {
                        this.onShow();
                    } else {
                        this.onHide();
                    }
                }
            })
        } else {
            console.warn('showSubject is undefined for slideOptions at SlideDirective during OnInit for member', this.element);
            return;
        }
        
        if (this.slideOptions.initialState == 'hide') {
            this.onHide();
        }

        if (this.slideOptions.delay > 0) {
            setTimeout(() => {
				if (this.slideOptions.initialState == 'hide') {
                    this.onShow();
                } else {
                    this.onHide();
                }
            }, this.slideOptions.delay)
        }
    }

    ngOnDestroy(): void {
        // TODO limpar scapeArea
    }

    private onShow(): void {
        switch (this.slideOptions.direction) {
            case 'up':
                this.element.style.transform = `${this.originalTranform} translateY(0)`;
                break;

            case 'down':
                this.element.style.transform = `${this.originalTranform} translateY(0)`;
                break;

            case 'left':
                this.element.style.transform = `${this.originalTranform} translateX(0)`;
                break;

            case 'right': 
                this.element.style.transform = `${this.originalTranform} translateX(0)`;
                break;
        }
        this.element.style.opacity = `${this.slideOptions.opecity ?? 1}`;
        this.originalTransition = (this.element.style.transition && this.element.style.transition.length > 0) ? (this.element.style.transition + ',') : '';
        this.element.style.transition = `${this.originalTransition} opacity ${this.slideOptions.actionTime}s ease-in-out ${this.slideOptions.actionTime*0.5}s,transform ${this.slideOptions.actionTime}s ease-in-out`;

        if (this.slideOptions.initialState == 'hide' && this.slideOptions.timer > 0) {
            setTimeout(() => {
                this.onHide();
            }, this.slideOptions.timer)
        }
    }

    private onHide(): void {

        switch (this.slideOptions.direction) {
            case 'up':
                this.element.style.transform = `${this.originalTranform} translateY(-${window.innerHeight}px)`;
                break;

            case 'down':
                this.element.style.transform = `${this.originalTranform} translateY(${window.innerHeight}px)`;
                break;

            case 'left':
                this.element.style.transform = `${this.originalTranform} translateX(-${window.innerWidth}px)`;
                break;

            case 'right': 
                this.element.style.transform = `${this.originalTranform} translateX(${window.innerWidth}px)`;
                break;
        }
        
        this.element.style.transition = `${this.originalTransition} opacity ${this.slideOptions.actionTime*0.5}s ease-in-out,transform ${this.slideOptions.actionTime}s ease-in-out`;
        this.element.style.opacity = '0';

        if (this.slideOptions.initialState == 'show' && this.slideOptions.timer > 0) {
            setTimeout(() => {
                this.onShow();
            }, this.slideOptions.timer)
        }
    }
}
