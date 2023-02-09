import { ComponentRef } from "@angular/core";
import { Subject } from "rxjs";
import { Layer } from "../../_shared/models/layer";
import { DialogComponent } from "../dialog.component";

export class DialogInstance {
	private _layer: Layer<DialogComponent>;

	/** Identificador único */
	get id(): number {
		return this._layer.id;
	}

	/** Referência do componente */
	get dialogComponentRef(): ComponentRef<DialogComponent> {
		return this._layer._component;
	}

	get closeSubject(): Subject<any>{
		return this._layer.closeSubject;
	}

	constructor(layer: Layer<DialogComponent>) {
		this._layer = layer;
		layer._component
	}
}