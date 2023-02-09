import { Subject } from "rxjs";

/** Classe base para componentes que podem ser abertos como caixa de dialogo */
export abstract class DialogComponentBase {
	
	/** Valor preenchido na criação da caixa de Dialogo a partir da propriedade de DialogComponentConfig. */
	data: any;

	private _closeSubject: Subject<any>;
	/** Subject deve ser chamado para o DialogService fechar a caixa de dialogo. (utilizar para devolver resposta para a classe que abriu a caixa de dialogo)*/
	get closeSubject(): Subject<any> {
		return this._closeSubject;
	}
}