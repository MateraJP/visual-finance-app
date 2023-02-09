import { ComponentRef } from "@angular/core";
import { ComponentType } from "../../_shared/models/component.type";
import { DialogComponentBase } from "./dialog-component-base";

/** Configuracoes para apresentar um componente como caixa de dialogo utilizando DialogService */
export class DialogComponentConfig<T extends DialogComponentBase> {

	/** titulo exibido na barra superior da caixa de dialogo. */
	titulo?: string;

	/** indica se o componente pode ser fechado sem clicar em uma action (clicando fora do componente ou no botao para fechar caixa de diálogo na barra superior)*/
	canClose?: boolean = true;
	
	/** indica se a caixa pode ser fechada o pressionar 'Esc' ou clicar fora da caixa */
	canScape?: boolean = true;

	/** componente que sera instanciado e exibido na caixa de dialogo */
	component: ComponentType<T>

	/** objeto injetado no componente para passagem de dados */
	data: any;

	/** componente que sera instanciado e exibido na caixa de dialogo */
	_componentRef: ComponentRef<T>

    constructor(init?: Partial<DialogComponentConfig<T>>) {
        Object.assign(this, init);
    }
}