import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'action-btn',
	templateUrl: './action-btn.component.html',
	styleUrls: ['./action-btn.component.scss']
})
export class ActionBtnComponent {
	/** Display label */
	@Input() label: string = '';

	/** Icon before label */
	@Input() leftIcon: string = '';

	/** Icon after label */
	@Input() rightIcon: string = '';

	/** Set sizes */
	@Input() size: 'unset' | 'default' | 'large' | 'small' = 'unset'; 

	/** Set colors schema*/
	@Input() type: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' = 'secondary';

	/** Insert custom style to div */
	@Input() style: string;

	/** Insert custom style to label */
	@Input() labelStyle: string;

	/** Async calls. (The click will start the process. Use 'pipe' to intersept obsavable responses) */
	@Input() observable: Observable<any>;

	/** Instant calls.  */
	@Input() callback: any;

	isLoading: boolean = false;

	execute(e: MouseEvent) {
		e.preventDefault();
		e.stopImmediatePropagation();

		if (this.isLoading) return;

		if (this.observable) {
			this.isLoading = true;
			this.observable.subscribe({ complete: this.complete })
		}
		
		if (this.callback) {
			this.isLoading = true;
			of(this.callback()).subscribe({ complete: this.complete })
		}
		
		if ((!this.observable) && (!this.callback)) {
			console.warn('Nenhum método configurado para este botão. Configure um callback para ações instantaneas ou um Observable para ações assíncronas.');
		}
	}

	private delay: any;
	private complete = (): void => {
		if (this.delay) {
			clearTimeout(this.delay);
		}
		
		this.delay = setTimeout(() => {
			this.isLoading = false;
		}, 100)
	}
}
