import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ColorPallet } from '../color-pallet';
import { Layer } from '../../../_shared/models/layer';
import { Color } from '../color';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-option-pallet',
	templateUrl: './option-pallet.component.html',
	styleUrls: ['./option-pallet.component.scss']
})
export class OptionPalletComponent implements OnInit {
    @Input('layer') layer: Layer<OptionPalletComponent>
    @Input('selectSubject') select: Subject<any>;
    @Input('clientRect') clientRect: DOMRect = new DOMRect();

	posX = 0;
	posY = 0;
	selectedHEX: string;
	isOpen: boolean = false;
	ColorPallet = ColorPallet;

	constructor(private changeDetect: ChangeDetectorRef) { }

	ngOnInit(): void {
        this.changeDetect.detectChanges();
        this.layer.openSubject.subscribe({
            next: () => { 
                this.isOpen = true;
            }
        })

        this.layer.closeSubject.subscribe({
            next: () => {
                this.isOpen = false;
            }
        })
	}

	
    onSelect(e: MouseEvent, value: Color): void {
		this.selectedHEX = value.hex;
		this.select.next(value);
	}
}
