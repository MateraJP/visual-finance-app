import {
    Directive,
    Input,
    ElementRef,
    HostListener,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { PositionEnum } from '../../models/position.enum';

@Directive({
    selector: '[touchTrack]'
})
export class TouchTrackDirective {
	/** Direções de rastreamento (Default: ambos) */
	@Input('touchTrack') touchTrack: TouchTrackType = TouchTrackType.Both;

	/** Movimento necessário para disparar trigger */
	@Input('touchTrackPrecision') precision: number = 100;

	/** Rastreio da ação */
	@Input('swapSubject') swap: Subject<Direction>;

	/** Rastreio do movimento */
	@Input('movementSubject') moviment: Subject<Cartesiano>;

	/** Término sem ação */
	@Input('finishSubject') finish: Subject<undefined>;
	
	private timeout: any;
	private tracking: boolean = false;
	private touchStartAt: Touch;
	private touchEndAt: Touch;
 
    constructor() { }

	@HostListener('touchstart', ['$event'])
    onTouchStart(e: TouchEvent): void {
		if (e.touches.length == 0 || e.touches.length > 1) {
			return;
		}
        
		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		this.timeout = setTimeout(() => {
			this.tracking = true;
			this.touchStartAt = e.touches[0];
			console.log(this.touchStartAt);
		}, 150);
    }

	@HostListener('touchend', ['$event'])
    onTouchEnd(e: TouchEvent): void {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		if (!this.tracking) {
			return;
		} 

		let action = false;
		if (this.touchTrack == TouchTrackType.Both || this.touchTrack == TouchTrackType.Horizontal) {
			if (this.touchStartAt.clientX < (this.touchEndAt.clientX - this.precision)) {
				// console.log('swap left');
				action = true;
				if (this.swap) {
					this.swap.next(Direction.Left);
				}
			}

			if (this.touchStartAt.clientX > (this.touchEndAt.clientX + this.precision)) {
				// console.log('swap right');
				action = true;
				if (this.swap) {
					this.swap.next(Direction.Right);
				}
			}
		}

		if (this.touchTrack == TouchTrackType.Both || this.touchTrack == TouchTrackType.Vertical) {
			if (this.touchStartAt.clientY < (this.touchEndAt.clientY - this.precision)) {
				// console.log('swap up');
				action = true;
				if (this.swap) {
					this.swap.next(Direction.Up);
				}
			}

			if (this.touchStartAt.clientY > (this.touchEndAt.clientY + this.precision)) {
				// console.log('swap down');
				action = true;
				if (this.swap) {
					this.swap.next(Direction.Down);
				}
			}
		}

		if (this.finish && !action) {
			this.finish.next();
		}

        // console.log(this.touchEndAt);
		this.tracking = false;
    }

	@HostListener('touchcancel', ['$event'])
    onTouchCancel(e: TouchEvent): void {
		this.tracking = false;
		this.touchStartAt = undefined;
		
		if (this.timeout) {
			clearTimeout(this.timeout)
		}


		if (this.finish) {
			this.finish.next();
		}
    }

	@HostListener('touchmove', ['$event'])
    onTouchMove(e: TouchEvent): void {
		if (!this.tracking) {
			return;
		}

		if (e.touches.length > 1) {
			this.tracking = false;
			this.touchStartAt = undefined;
			return;
		}

		if (this.moviment) {
			this.moviment.next({
				x: e.touches[0].clientX - this.touchStartAt.clientX,
				y: e.touches[0].clientY - this.touchStartAt.clientY
			});
		}

		this.touchEndAt = e.touches[0];
    }
}

export enum TouchTrackType {
	Vertical = 'Vertical',
	Horizontal = 'Horizontal',
	Both = 'Both'
}

export enum Direction {
	Up = 'Up',
	Down = 'Down',
	Left = 'Left',
	Right = 'Right'
}

export class Cartesiano {
	x: number;
	y: number;
}