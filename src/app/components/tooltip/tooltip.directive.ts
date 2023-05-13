import {
    Directive,
    Input,
    ElementRef,
    HostListener,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { PositionEnum } from '../../models/position.enum';

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnChanges {
    /**
     * Texto presente no tooltip.
     */
    @Input('tooltip') tooltipValue = '';
    /**
     * Tamanho que o tooltip deve possuir.
     */
    @Input() tooltipPosition = PositionEnum.Top;

    private isOpen = false;
    private container: any;
    private containerVal: any;
    private currentVal: string;

    constructor() { }

    /**
     * Trata o evento de hover sobre o tooltip.
     */
    @HostListener('mouseenter', ['$event'])
    onMouseEnter(e: MouseEvent): void {
        if (this.tooltipValue && this.tooltipValue.length > 0) {
            this.addTooltip(e);
        }
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.removeTooltip();
    }

    @HostListener('window:customScrollBy', ['$event']) 
    onScroll(event: any) {
        if (this.isOpen) this.removeTooltip();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tooltipTitle 
            && !changes.firstChange) {
            this.containerVal = document.getElementById('tooltipVal');
            if (this.containerVal)
                this.containerVal.innerHTML = this.tooltipValue;
        }
    }

    private addTooltip(e: MouseEvent): void {
        if (this.isOpen && this.currentVal == this.tooltipValue) return;
        this.currentVal = this.tooltipValue;
        this.isOpen = true;

		if (window.innerWidth < 760) {
			setTimeout(() => {
				this.removeTooltip();
			}, 4000);
		}

        setTimeout(() => {
            this.container = document.getElementById('tooltip');

			if ((!e) || (!this.container)) return;
            if (e.x + (this.tooltipValue.length * 10) > window.innerWidth && this.tooltipPosition != PositionEnum.Left) {
				this.container.style.lineBreak = 'auto';
				this.container.style.maxWidth = (window.innerWidth - 40) + 'px';
                this.container.style.left = `${e.x + 10}px`;
            }
            else {
                this.container.style.left = `${e.x + 10}px`;
            }

            this.container.style.top = `${e.y + 10}px`;
            this.container.style.opacity = 1;
			
            
            this.containerVal = document.getElementById('tooltipVal');
            if (this.containerVal) {
                this.containerVal.innerHTML = this.tooltipValue;
            }
			
			if (this.tooltipPosition == PositionEnum.Left) {
				this.container.style.transform = `translateX(-${this.container.clientWidth}px)`;
			}
			else if (this.tooltipPosition == PositionEnum.Top) {
				this.container.style.transform = `translateY(-${this.container.clientHeight}px) translateX(0)`;
			}
			else  {
				this.container.style.transform = 'translateX(0)';
			}
        })
    }

    private removeTooltip(): void {
        if (!this.isOpen) return;

		if (!this.container) return;
        this.container.style.opacity = 0;
        setTimeout(() => {
			this.isOpen = false;
        	this.container = document.getElementById('tooltip');
            if (!this.isOpen)
                this.container.style.transform = `translateX(${window.innerWidth}px)`;
        }, 200);
    }
}
