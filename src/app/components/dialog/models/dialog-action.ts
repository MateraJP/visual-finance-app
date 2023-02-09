/** Configuracao de acoes exibidas na barra inferior da caixa de dialogo */
export class DialogAction {

	/** texto exibido no botao */
	texto?: string;

	/** class aplicada ao botao */
	class?: string; 

	/** style aplicado ao botao */
	style?: string;

	/** icone exibido ao lado do texto */
	icone?: string;

	/** funcao para ser executada ao click do botao */
	callback: any;
	
    constructor(init?: Partial<DialogAction>) {
        Object.assign(this, init);
    }
}
