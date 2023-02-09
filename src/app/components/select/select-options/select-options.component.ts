import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Layer } from '../../_shared/models/layer';

@Component({
	selector: 'app-select-options',
	templateUrl: './select-options.component.html',
	styleUrls: ['./select-options.component.scss']
})
export class SelectOptionsComponent implements OnInit, OnChanges {
	@Input('toggleSubject') toggleSubject: Subject<boolean>;
	@ViewChild('search') search: ElementRef;

	isOpen: boolean = true;
	currentOptions: any[];
	key: string;
	display: string;
	displayIcon: string;
	canSearch: boolean = true;
	options: any[] = [];
	clientRect: DOMRect = new DOMRect();

	layer: Layer<SelectOptionsComponent>;
	constructor() { }

	ngOnInit(): void {// TODO: passar para o change subject pois Layer pode estar nulo na execução do ngOnInit
		this.layer.openSubject.subscribe({
			next: () => {
				if (this.canSearch) {
					this.currentOptions = this.options;
					this.search.nativeElement.focus();
				}
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.options && changes.options.isFirstChange()) {
			this.currentOptions = this.options;
		}
	}
	
	public onSelect: any;
	public close: any;

	private timeout : any;
	onSearch(e: KeyboardEvent): void {
		if (e.key == 'Enter' && this.currentOptions && this.currentOptions.length == 1) {
			return this.onSelect(this.currentOptions[0]);
		} else if (e.key == 'Escape') {
			this.close();
		}

		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		this.timeout = setTimeout(this.onFilter, 400);
	}

	onFilter = (): void => {
		if (this.canSearch && this.search.nativeElement && this.search.nativeElement.value && this.search.nativeElement.value.length > 0) {
			this.currentOptions = [];
			this.currentOptions = this.options.filter(f => {
				if (this.display && f[this.display]) {
					return f[this.display].includes(this.search.nativeElement.value)
				}			
				else if(this.key && f[this.key]) {
					return f[this.key].includes(this.search.nativeElement.value)
				}
				else {
					return f.includes(this.search.nativeElement.value)
				}
			})
		} else {
			this.currentOptions = this.options;
		}
	}

	trackItem = (index: number, item: any) => {
		if (this.display && item.id) {
			return item.id
		}
		if (this.display && item[this.display]) {
			return item[this.display]
		}
		else if (this.key && item[this.key]) {
			return item[this.key]
		}
		else {
			return item
		}
	}

	getDisplayValue(option: any): string {
		if (!option) {
			return '';
		} else if (this.display) {
			return option[this.display];
		 } else if (this.key) {
			return option[this.key];
		 } else {
			return option;
		}
	}	
}
