import { 
	AfterViewInit,
	ComponentFactoryResolver,
	ComponentRef, 
	Directive, 
	ElementRef, 
	EventEmitter, 
	Injector, 
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output, 
	Self, 
	SimpleChanges, 
	ViewContainerRef
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { Observable } from "rxjs";

import { SelectInputComponent } from "./select-input.component";

@Directive({
    selector: '[select]'
})
export class SelectDirective { //implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	@Input('select') select: 'single' | 'multiple';
	// @Input('options') options: any[]; //static
	// @Input('optionKey') key: string;
	// @Input('optionValue') value: string;
	// @Input('optionDisplay') display: string;
	// //@Input('optionsObservable') optionsObservable: Observable<any[]>; //non static
    // @Output() readonly chages = new EventEmitter<any>();

    // private element: HTMLInputElement;
    // private selectRef: ComponentRef<SelectComponent>;

	// constructor(
    //     @Self() private control: NgControl,
    //     injector: Injector,
    //     el: ElementRef,
    //     private viewContainer: ViewContainerRef,
    //     componentFactoryResolver: ComponentFactoryResolver
	// ) {
    //     this.element = el.nativeElement;
	// 	const dropdownFactory = componentFactoryResolver.resolveComponentFactory(SelectComponent);
	// 	this.selectRef = dropdownFactory.create(injector);
    //     this.selectRef.instance.type = this.select;
    //     this.selectRef.instance.key = this.key;
    //     this.selectRef.instance.value = this.value;
	// }

	// ngOnInit(): void {
	// 	let loaded = false;
	// 	if (this.control.valueChanges) {
	// 		this.control.valueChanges.subscribe({
	// 			next: (val) => {
	// 				if (!loaded) {
	// 					console.log(`2 ${val}`);
	// 					this.selectRef.instance.selected = this.control.value;
	// 					loaded = true;
	// 				}

	// 				// todo: check for manual changes
	// 				// Set this before proceeding to ensure no circular loop occurs with selection.
	// 				// this._value = newValue;
	// 			}
	// 		})
	// 	}
	// }

	// ngOnChanges(changes: SimpleChanges): void {
	// 	if (changes && changes.options) {
	// 		if (this.options && this.options.length > 0) 
	// 			this.selectRef.instance.updateOptions(this.options);
	// 	}
	// }

	// ngOnDestroy(): void {
    //     this.selectRef.destroy();
	// }

	// ngAfterViewInit(): void {
	// 	// TODO: attach ontop of input box
	// 	this.element.style.display = 'none';
	// 	this.viewContainer.insert(this.selectRef.hostView);
	// }

	// onSelect(option: any) : void {
		
	// }
}












