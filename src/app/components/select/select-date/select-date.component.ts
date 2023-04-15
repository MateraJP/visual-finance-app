import { 
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    Optional,
    Self,
	ViewChild
} from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';

import { CustomImputBase } from '../../_shared/models/custom-input.base';
import { Layer } from '../../_shared/models/layer';
import { LayerService } from '../../_shared/services/layer.service';
import { SelectDateType } from '../models/select-date-type';
import { SelectDateOptionsComponent } from './select-date-options/select-date-options.component';
import { Subject } from 'rxjs';
import { DateModel } from './date-settings';

@Component({
    selector: 'select-date-input',
    templateUrl: './select-date.component.html',
    styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent extends CustomImputBase implements OnDestroy {
    @HostBinding() id = `select-date-${SelectDateComponent.identity++}`;
    @ViewChild('fc') fc: ElementRef;
	@Input('tipoSelecao') tipoSelecao: SelectDateType = SelectDateType.Day

    // 
    selected: DateModel;// = new DateModel(1);
    isOpen = false;
    
	private selectSubject = new Subject<any>()
    private static identity: number = 0;
    private layer: Layer<any>;

    constructor(
        @Optional() @Self() public ngControl: NgControl,
        private changeDetection: ChangeDetectorRef,
        private layerService: LayerService,
        fb: FormBuilder) { 
            super();
            
        // Setting the value accessor to avoid running into a circular import.
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        } 

		this.layer = layerService.createLayer(SelectDateOptionsComponent);
        this.layer.backgroundBlur = 0;
        this.layer.backgroundColor = '';
		this.layer.closeSubject.subscribe({
			next: () => {
				this.close();
			}
		})
		this.layer._component.instance.select = this.selectSubject;

		this.selectSubject.subscribe({
			next: (selected: DateModel) => {
				this.onTouched(); // <-- mark as touched
				this.selected = selected;
	
				// PARA RECEBER O OBJETO TODO, O BACK DEVE ESTAR PREPARADO PARA RECEBER
				if (this.ngControl) {
					if (selected)
						this.ngControl.control.setValue(new Date(selected.ano, selected.mes, selected.dia));
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

    ngOnDestroy(): void {
        super.ngOnDestroy();

		if (this.layer)
        	this.layer.destroySubject.next();
    }

    // private subLoad: Subscription;
    // ngOnInit(): void {
    // 	//get layer on a global variable and use subjects to open and close component
    // 	this.layer = this.layerService.createLayer(SelectOptionsComponent);
    // 	this.layer.backgroundBlur = 0;
    // 	this.layer.backgroundColor = '';
    // 	this.layer.closeSubject.subscribe({
    // 		next: () => { this.close() }
    // 	})

    //  	let loaded = false;
    //  	if (this.ngControl && this.ngControl.valueChanges) {
    //  		this.subLoad = this.ngControl.valueChanges.subscribe({
    //  			next: (val) => {
    //  				if (!loaded) {
    // 					if (this.key) {
    // 						if (this.options 
    // 							&& this.options.length
    // 							&& this.options.filter(f => f[this.key] == val).length > 0) {
    // 							this.selected = this.options.filter(f => f[this.key] == val)[0];
    // 						}
    // 						else {
    // 							this.selected = { key: val, value: val }
    // 						}
    // 					 } else if (this.display) {
    // 						this.selected = { key: val, value: val }
    // 					 } else {
    // 						this.selected = val;
    // 					}
    //  					loaded = true;  
    // 					this.subLoad.unsubscribe();
    //  				}
    //  			}
    //  		})
    //  	}
    //  }

    // getDisplayValue(option: any): string {
    // 	if (!option) {
    // 		return '';
    // 	} else if (this.display) {
    // 		return option[this.display];
    // 	 } else if (this.key) {
    // 		return option[this.key];
    // 	 } else {
    // 		return option;
    // 	}
    // }	

    // clear(): void {
    // 	this.selected = undefined;
    // 	this.ngControl.control.setValue(undefined);
    // }

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

    // 	this.layer._component.instance.key = this.key;
    // 	this.layer._component.instance.display = this.display;
    // 	this.layer._component.instance.displayIcon = this.displayIcon;
    // 	this.layer._component.instance.canSearch = this.canSearch;
    // 	this.layer._component.instance.options = this.options;
    // 	this.layer._component.instance.clientRect = this.fc.nativeElement.getBoundingClientRect();
    // 	this.layer._component.instance.close = (): void => {
    // 		this.layer.closeSubject.next();
    // 	}
    // 	this.layer._component.instance.onSelect = (selected: any): void => {
    // 		this.onTouched(); // <-- mark as touched
    // 		this.selected = selected;
    
    // 		// PARA RECEBER O OBJETO TODO, O BACK DEVE ESTAR PREPARADO PARA RECEBER
    // 		if (this.ngControl && this.key) {
    //          this.ngControl.control.setValue(selected[this.key]);
    //      } else if (this.ngControl) {
    //      	this.ngControl.control.setValue(selected);
    //      }
            
    // 		if (this.onChangeSubject) {
    // 			this.onChangeSubject.next(selected);
    // 		}
    
    // 		this.layer.closeSubject.next();
    // 	}
        


    // 	;
    // 	this.layer.openSubject.next();
    }

    private close(): void {
     	this.isOpen = false;
    }
}
