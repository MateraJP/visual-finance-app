import { Component, OnInit } from '@angular/core';
import { ActionBtnModel } from '../action-btn/action-btn.model';

@Component({
	selector: 'app-action-toolbar',
	templateUrl: './action-toolbar.component.html',
	styleUrls: ['./action-toolbar.component.scss']
})
export class ActionToolbarComponent implements OnInit {
	buttons: ActionBtnModel[] = [
		new ActionBtnModel({
			size: 'default',
			type: 'danger',
			rightIcon: 'fas fa-trash',
			label: 'Excluír'
		}),
		
		new ActionBtnModel({
			size: 'default',
			type: 'primary',
			rightIcon: 'fas fa-plus',
			label: 'Salver e Novo'
		}),

		new ActionBtnModel({
			size: 'default',
			type: 'success',
			rightIcon: 'fas fa-save',
			label: 'Salvar'
		})
	];
/*
			<action-btn [size]="'large'" [type]="'danger'" [leftIcon]="'fas fa-trash'"></action-btn> 
			<action-btn [size]="'large'" [type]="'primary'" [leftIcon]="'fas fa-plus'"></action-btn> 
			<action-btn [size]="'large'" [type]="'success'" [leftIcon]="'fas fa-save'" [observable]="teste"></action-btn> 

			<action-btn [size]="'default'" [type]="'primary'" [label]="'Confirmar'" [observable]="teste" [rightIcon]="'fas fa-check'"></action-btn>
			<action-btn [size]="'default'" [type]="'secondary'" [label]="'Cancelar'" [callback]="testeCallback"></action-btn>
			<action-btn [size]="'default'" [type]="'success'" [label]="'Confirmar'"></action-btn>
			
*/

	constructor() { }

	ngOnInit(): void {
	}

}
