import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideDirective } from './side-nav/side-nav.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { SelectInputComponent } from './select/select-input.component';
import { SelectDirective } from './select/select.directive';
import { SelectOptionsComponent } from './select/select-options/select-options.component';
import { TouchTrackDirective } from './touch-track/touch-track.directive';
//import { TooltipDirective } from './tooltip/tooltip.directive';
//import { ShartPieComponent } from './chart-pie/chart-pie.component';
//import { DragDropDirective } from './drag&drop/drag-drop.directive';
//import { DatepickerComponent } from './datepicker/datepicker.component';
//import { MaskDirective } from './mask/mask.directive';
//import { DecimalDirective } from './mask/decimal.directive';
//import { DatepickerDirective } from './datepicker/datepicker.directive';
//import { DatepickerSelectorComponent } from './datepicker/datepicker-selector/datepicker-selector.component';

@NgModule({
    declarations: [
        SlideDirective,
        TooltipDirective,
		TouchTrackDirective,
        SelectInputComponent,
		SelectDirective,
		SelectOptionsComponent,
        // ShartPieComponent,
        // DragDropDirective,
        // DatepickerComponent,
        // MaskDirective,
        // DecimalDirective,
        // DatepickerDirective,
        // DatepickerSelectorComponent
    ],
    exports: [
        SlideDirective,
        TooltipDirective,
		TouchTrackDirective,
        SelectInputComponent,
		SelectDirective,
        // ShartPieComponent,
        // DragDropDirective,
        // DatepickerComponent,
        // MaskDirective,
        // DecimalDirective,
        // DatepickerDirective
    ],
    imports: [
        CommonModule
    ]
})
export class ComponentsModule { }
