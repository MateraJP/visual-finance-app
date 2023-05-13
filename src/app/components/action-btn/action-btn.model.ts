import { Observable } from "rxjs";

export class ActionBtnModel {
	/** Display label */
	label: string = '';

	/** Icon before label */
	leftIcon: string = '';

	/** Icon after label */
	rightIcon: string = '';

	/** Set sizes */
	size: 'unset' | 'default' | 'large' | 'small' = 'unset'; 

	/** Set colors schema*/
	type: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' = 'secondary';

	/** Insert custom style to div */
	style: string;

	/** Insert custom style to label */
	labelStyle: string;

	/** Async calls. (The click will start the process. Use 'pipe' to intersept obsavable responses) */
	observable: Observable<any>;

	/** Instant calls.  */
	callback: any;

	constructor(init?: Partial<ActionBtnModel>) {
		Object.assign(this, init);
	}
}