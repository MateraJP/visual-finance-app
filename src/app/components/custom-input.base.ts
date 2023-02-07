import { Component, forwardRef, HostBinding, Injectable, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export abstract class CustomImputBase implements ControlValueAccessor, OnDestroy {
	parts: FormGroup;

	protected controlType: string;
	protected stateChanges = new Subject<void>();
	protected touchSubject = new Subject<void>();
	protected _placeholder: string;
	protected _required = false;
	protected _disabled = false;
	protected _touched = false;
	protected _focused = false;


	@Input()
	get placeholder() {
		return this._placeholder;
	}
	set placeholder(plh) {
		this._placeholder = plh;
		//this.stateChanges.next();
	}

	@Input()
	get required(): boolean {
		return this._required;
	}
	set required(req: boolean) {
		this._required = req; 
		//this.stateChanges.next();
	}

	@Input()
	get disabled(): boolean { 
		return this._disabled; 
	}
	set disabled(value: boolean) {
		this._disabled = value; 
		this._disabled ? this.parts.disable() : this.parts.enable();
		//this.stateChanges.next();
	}

	get errorState(): boolean {
		return this.parts.invalid && this._touched;
	}
	

	onFocusIn(event: FocusEvent) {
		if (!this._focused) {
			this._focused = true;
			//this.stateChanges.next();
		}
	}
  
	onFocusOut(event: FocusEvent) {
		this._touched = true;
		this._focused = false;
		this.onTouched();
		//this.stateChanges.next();
	}
  
	onTouched(): void {
		this.touchSubject.next();
	}

	onChange(): void {
		// this.stateChanges.next();
	}

	onChanged(): void {
		// this.stateChanges.next();
	}

	writeValue(obj: any): void {
		// this.value = obj;
	}
	registerOnChange(fn: any): void {
		this.stateChanges.subscribe({
			next: fn
		})
	}
	registerOnTouched(fn: any): void {
		this.touchSubject.subscribe({
			next: fn
		})
	}
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	ngOnDestroy(): void {
		this.stateChanges.complete();
		this.touchSubject.complete();
	}
}