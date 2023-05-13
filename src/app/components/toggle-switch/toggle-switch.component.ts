import {
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	Optional,
	Self,
	ViewChild
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { CustomImputBase } from '../_shared/models/custom-input.base';
import { Subject } from 'rxjs';

@Component({
	selector: 'toggle-switch-input',
	templateUrl: './toggle-switch.component.html',
	styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent extends CustomImputBase implements OnDestroy {
	@HostBinding() id = `toggle-switch-${ToggleSwitchComponent.identity++}`;
	@ViewChild('fc') fc: ElementRef;
	@Input() uncheckedLabel: string;
	@Input() uncheckedIcon: string;
	@Input() checkedLabel: string;
	@Input() checkedIcon: string;
	@Input() labelsmall: boolean = false;
	
	value: boolean = false;

	private static identity: number = 0;
	constructor(
		@Optional() @Self() public ngControl: NgControl) {
		super();

		// Setting the value accessor to avoid running into a circular import.
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnInit(): void {
		let loaded = false;
		if (this.ngControl != null) {
			this.ngControl.valueChanges.subscribe({
				next: (t) => {
					if (!loaded) {
						loaded = true;
						this.value = t;
					}
				}
			})
		}
	}

	toggle(e: MouseEvent): void {
		e.preventDefault();
		e.stopImmediatePropagation();
		this.value = !this.value;
		
		if (this.ngControl != null) {
			this.ngControl.control.setValue(this.value);
		}
	}
}
