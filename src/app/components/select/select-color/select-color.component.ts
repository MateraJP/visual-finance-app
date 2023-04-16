import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { Color } from './color';
import { Layer } from '../../_shared/models/layer';
import { LayerService } from '../../_shared/services/layer.service';
import { OptionPalletComponent } from './option-pallet/option-pallet.component';
import { Subject } from 'rxjs';
import { CustomImputBase } from '../../_shared/models/custom-input.base';
import { NgControl } from '@angular/forms';

@Component({
	selector: 'select-color-input',
	templateUrl: './select-color.component.html',
	styleUrls: ['./select-color.component.scss']
})
export class SelectColorComponent extends CustomImputBase implements OnInit, OnDestroy {
	private static identity: number = 0;
    @ViewChild('fc') fc: ElementRef;
	@HostBinding() id = `select-color-${SelectColorComponent.identity++}`;

    selected: Color;
    isOpen = false;
	
    private layer: Layer<any>;
	private selectSubject = new Subject<any>();

	constructor(
        @Optional() @Self() public ngControl: NgControl,
        layerService: LayerService) { 
		super();
            
        // Setting the value accessor to avoid running into a circular import.
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        } 
		
		this.layer = layerService.createLayer(OptionPalletComponent);
        this.layer.backgroundBlur = 0;
        this.layer.backgroundColor = '';
		this.layer.closeSubject.subscribe({
			next: () => {
				this.close();
			}
		})

		this.layer._component.instance.select = this.selectSubject;
		this.selectSubject.subscribe({
			next: (selected: Color) => {
				this.onTouched(); // <-- mark as touched
				this.selected = selected;
	
				// PARA RECEBER O OBJETO TODO, O BACK DEVE ESTAR PREPARADO PARA RECEBER
				if (this.ngControl) {
					if (selected)
						this.ngControl.control.setValue(selected.hex);
					else
						this.ngControl.control.setValue(undefined);
				}
	
				// if (this.onChangeSubject) {
				// 	this.onChangeSubject.next(selected);
				// }
	
				this.layer.closeSubject.next();
			}
		})
	}

	ngOnInit(): void {
		let loaded = false;
		if (this.ngControl != null) {
			this.ngControl.valueChanges.subscribe({
				next: (t) => {
					if (!loaded) {
						loaded = true;
						if (t)
							this.selectSubject.next(Color.fromHex(t))
					}
				}
			})
		}
	}

    ngOnDestroy(): void {
        super.ngOnDestroy();

		if (this.layer)
        	this.layer.destroySubject.next();
    }

    toggle(): void {
    	if (this.isOpen) {
			this.layer.closeSubject.next();
    		this.close();
		}
    	else {
			this.layer.openSubject.next();
    		this.open();
		}
    }

    clear(): void {
        this.selected = undefined;
        if (this.ngControl) {
            this.ngControl.control.setValue(undefined);
        }
    }
	
    private open(): void {
    	this.isOpen = true;
        this.layer._component.instance.clientRect = this.fc.nativeElement.getBoundingClientRect();
    }

    private close(): void {
     	this.isOpen = false;
    }
}
