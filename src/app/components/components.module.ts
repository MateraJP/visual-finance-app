import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { SelectOldInputComponent } from './select-old/select-input.component';
import { SelectOptionsComponent } from './select-old/select-options/select-options.component';
import { TouchTrackDirective } from './touch-track/touch-track.directive';
import { ActionBtnComponent } from './action-btn/action-btn.component';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { SlideDirective } from './side-nav/side-nav.directive';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
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
        SelectOldInputComponent,
		SelectOptionsComponent,
		ActionBtnComponent,
		ActionToolbarComponent,
		ToggleSwitchComponent,
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
        SelectOldInputComponent,
		ActionBtnComponent,
		ToggleSwitchComponent,
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
