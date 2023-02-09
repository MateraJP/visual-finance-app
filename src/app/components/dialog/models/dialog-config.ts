import { DialogAction } from "./dialog-action";
import { DialogType } from "./dialog-type.enum";

/** Configurações para apresentar uma caixa de diálogo utilizando DialogService */
export class DialogConfig {

	/** define a marca dagua a ser exibido no centro da caixa de diálogo. */
	tipo?: DialogType = DialogType.Information;

	/** titulo exibido na barra superior da caixa de diálogo. */
	titulo?: string;

	/** mensagem a ser exibida no centro da caixa de diálogo (exceto para caixas tipo html ou component). */
	mensagem?: string;

	/** injeta o html na caixa de diálogo para ser exibido (o campo mensagem sera ignorado). */
	innerHtml?: string

	/** indica se o componente pode ser fechado sem clicar em uma action (clicando fora do componente ou no botao para fechar caixa de diálogo na barra superior)*/
	canClose?: boolean = true;
	
	/** indica se a caixa pode ser fechada o pressionar 'Esc' ou clicar fora da caixa */
	canScape?: boolean = true;

	/** botoes na barra inferior da caixa de diálogo (caixa fechara automaticamente apos executar callback) */
	actions?: DialogAction[] = [
		new DialogAction({
			texto: 'Ok',
			class: 'primary'
		})
	];

    constructor(init?: Partial<DialogConfig>) {
        Object.assign(this, init);
    }
}