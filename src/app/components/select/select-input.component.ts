import { ChangeDetectorRef, Component, ElementRef, forwardRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Layer, LayerService } from '../../services/layer.service';
import { CustomImputBase } from '../custom-input.base';
import { SelectOptionsComponent } from './select-options/select-options.component';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent extends CustomImputBase implements OnChanges {
	static nextId = 0;
	selected: any;
	isOpen = false;
	currentOptions: any[];

	private layer: Layer<SelectOptionsComponent>;
	toggleSubject = new Subject<boolean>();

	@Input('options') options: any[]; //static
	@Input('optionKey') key: string;
	@Input('optionDisplay') display: string;
	@Input('optionIcon') displayIcon: string;
	@Input('onChangeSubject') onChangeSubject: Subject<any>;
	@Input('canSearch') canSearch: boolean = true;
	// @Input('optionsObservable') optionsObservable: Observable<any[]>; //non static

	@HostBinding() id = `select-input-${SelectInputComponent.nextId++}`;

	@ViewChild('fc') fc: ElementRef;

	constructor(
		@Optional() @Self() public ngControl: NgControl,
		private changeDetection: ChangeDetectorRef,
		fb: FormBuilder,
		private layerService: LayerService) { 
			super();
			
		// Setting the value accessor to avoid running into a circular import.
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		
	}

	private subLoad: Subscription;
	ngOnInit(): void {
		//get layer on a global variable and use subjects to open and close component
		this.layer = this.layerService.createHoverComponent(SelectOptionsComponent);
		this.layer.closeOnBlur = true;
		this.layer.closeSubject.subscribe({
			next: () => { this.close() }
		})

	 	let loaded = false;
	 	if (this.ngControl && this.ngControl.valueChanges) {
	 		this.subLoad = this.ngControl.valueChanges.subscribe({
	 			next: (val) => {
	 				if (!loaded) {
						if (this.key) {
							if (this.options 
								&& this.options.length
								&& this.options.filter(f => f[this.key] == val).length > 0) {
								this.selected = this.options.filter(f => f[this.key] == val)[0];
							}
							else {
								this.selected = { key: val, value: val }
							}
						 } else if (this.display) {
							this.selected = { key: val, value: val }
						 } else {
							this.selected = val;
						}
	 					loaded = true;  
						this.subLoad.unsubscribe();
	 				}
	 			}
	 		})
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

	clear(): void {
		this.selected = undefined;
		this.ngControl.control.setValue(undefined);
	}

	toggle(): void {
		if (this.isOpen)
			this.close();
		if (!this.isOpen)
			this.open();
	}

	private open(): void {
		this.isOpen = true;

		this.layer.component.instance.key = this.key;
		this.layer.component.instance.display = this.display;
		this.layer.component.instance.displayIcon = this.displayIcon;
		this.layer.component.instance.canSearch = this.canSearch;
		this.layer.component.instance.options = this.options;
		this.layer.component.instance.clientRect = this.fc.nativeElement.getBoundingClientRect();
		this.layer.component.instance.close = (): void => {
			this.layer.closeSubject.next();
		}
		this.layer.component.instance.onSelect = (selected: any): void => {
			this.onTouched(); // <-- mark as touched
			this.selected = selected;
	
			// PARA RECEBER O OBJETO TODO, O BACK DEVE ESTAR PREPARADO PARA RECEBER
			if (this.key) {
				 this.ngControl.control.setValue(selected[this.key]);
			} else {
				this.ngControl.control.setValue(selected);
			}
			
			if (this.onChangeSubject) {
				this.onChangeSubject.next(selected);
			}
	
			this.layer.closeSubject.next();
		}
		


		;
		this.layer.openSubject.next();
		// this.toggleSubject.next(true);
		// if (this.canSearch) {
		// 	this.search.nativeElement.focus();
		// }

		// TODO: LayerService.Add()
		// let top = this.fc.nativeElement.getBoundingClientRect().top + this.fc.nativeElement.getBoundingClientRect().height;
		// let left = this.fc.nativeElement.getBoundingClientRect().left;
		// let width = this.fc.nativeElement.getBoundingClientRect().width;
		// console.log({ top, left, width });
	}

	private close(): void {
		this.isOpen = false;
		// TODO: avoid loop
		// this.layer.closeSubject.next();
		
		// this.toggleSubject.next(false);
		// if (this.canSearch && this.search.nativeElement && this.search.nativeElement.value) {
		// 	this.search.nativeElement.value = '';
		// 	setTimeout(() => {
		// 		this.currentOptions = this.options;0
		// 	}, 100);
		// }
	}
}
