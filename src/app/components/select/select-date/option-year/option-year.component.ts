import { Component, Input, OnInit, Output } from '@angular/core';
import { Direction } from '../../../touch-track/touch-track.directive';

@Component({
	selector: 'app-option-year',
	templateUrl: './option-year.component.html',
	styleUrls: ['./option-year.component.scss']
})
export class OptionYearComponent implements OnInit {
	@Input('makeTurn') makeTurn: any;

	currentPeriodo: number;
	currentPeriodos: string[] = []

	constructor() {
		this.currentPeriodo = new Date().getFullYear();
		let prefix = (this.currentPeriodo / 10).toFixed(0)
		for (let x = 0; x <= 9; x++) {
			this.currentPeriodos.push(prefix + x);
		} 
	}

	ngOnInit(): void {

	}

	changeSelection(e: MouseEvent): void {
		e.preventDefault();
		e.stopPropagation();

	}

	turnLeft(e: MouseEvent): void {
		e.preventDefault();
		e.stopPropagation();

		this.makeTurn(e, Direction.Left);
		setTimeout(() => {
			let prefix = ((Number(this.currentPeriodos[0]) - 10) / 10).toFixed(0);
			this.currentPeriodos = [];
			for (let x = 0; x <= 9; x++) {
				this.currentPeriodos.push(prefix + x);
			} 
		}, 250)
	}

	turnRight(e: MouseEvent): void {
		e.preventDefault();
		e.stopPropagation();

		this.makeTurn(e, Direction.Right);
		setTimeout(() => {
			let prefix = ((Number(this.currentPeriodos[0]) + 10) / 10).toFixed(0);
			this.currentPeriodos = [];
			for (let x = 0; x <= 9; x++) {
				this.currentPeriodos.push(prefix + x);
			} 
		}, 250)
	}

	onSelect(e: MouseEvent, year: string): void {

	}
}
