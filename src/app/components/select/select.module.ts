import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectDateComponent } from './select-date/select-date.component';
import { SelectDateOptionsComponent } from './select-date/select-date-options/select-date-options.component';
import { ComponentsModule } from '../components.module';
import { OptionYearComponent } from './select-date/option-year/option-year.component';
import { OptionDayComponent } from './select-date/option-day/option-day.component';
import { OptionMonthComponent } from './select-date/option-month/option-month.component';
import { OptionTimeComponent } from './select-date/option-time/option-time.component';
import { MaskDirective } from '../mask/mask.directive';

@NgModule({
	imports: [
		CommonModule,
		ComponentsModule,
	],
	declarations: [
		MaskDirective,
		SelectDateComponent,
		SelectDateOptionsComponent,
		OptionYearComponent,
		OptionDayComponent,
		OptionMonthComponent,
		OptionTimeComponent
	],
	exports: [
		MaskDirective,
		SelectDateComponent,
		SelectDateOptionsComponent
	],
	providers: []
})
export class SelectModule { }