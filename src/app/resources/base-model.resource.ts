import { forkJoin, Observable, of } from "rxjs";
import { BaseModel } from "../models/base-model";
import { RequestModel } from "../models/request.model";
import { RequestService } from "../services/request.service";

export class BaseModelResource<T extends BaseModel> {
	protected _isStatic: boolean = false;
	protected _isAbsoluteUrl: boolean = false;
	protected baseController: string = '';
	private items: T[] = [];

	constructor(protected requestService: RequestService) { }

	private get _requestService(): RequestService | undefined {
        return this.requestService;
    }

    /**
     * Obtém registros.
     */
    getAll(): Observable<T[]> {
		return this.requestService.makeGet(
			new RequestModel({
				url: this.getUrl(''), //this._config.actions.get
				isAbsolute: this._isAbsoluteUrl,
			})
		);
    }

    /**
     * Obtém um registro.
     * @param id ID do registro.
     */
    get(id: string): Observable<T> {
		return this._requestService.makeGet(
			new RequestModel({
				url: this.getUrl(''), //this._config.actions.get
				id: id,
				isAbsolute: this._isAbsoluteUrl,
			})
		);
    }

    /**
     * Cria um novo registro.
     * @param data Dados do registro.
     */
    add(data: T): Observable<T> {
        if (this._isStatic) return this.addStatic(data);
        if (this._requestService)
            return this._requestService.makePost(
                new RequestModel({
                    url: this.getUrl(''), //this._config.actions.add
                    data,
                    isAbsolute: this._isAbsoluteUrl,
                })
            );

        return new Observable();
    }

    /**
     * Atualiza os dados de um registro.
     * @param data Dados a serem atualizados.
     */
    edit(data: T): Observable<T> {
        if (this._requestService)
            return this._requestService.makePut(
                new RequestModel({
                    url: `${this.getUrl('')}`, //this._config.actions.edit
                    data,
                    isAbsolute: this._isAbsoluteUrl,
                })
            );

        return new Observable();
    }

    /**
     * Exclui o registro informado.
     * @param id ID do registro a ser excluído.
     */
    remove(id: string): Observable<boolean> {
        if (this._requestService)
            return this._requestService.makeDelete(
                new RequestModel({
                    url: this.getUrl(''), //this._config.actions.remove
                    id: id,
                    isAbsolute: this._isAbsoluteUrl,
                })
            );

        return new Observable();
    }

    /**
     * Exclui os registros informados.
     * @param ids IDs dos registros a serem excluídos.
     */
    removeMany(ids: string[]): Observable<boolean[]> {
        const requests: Observable<boolean>[] = [];
        ids.forEach((id) => requests.push(this.remove(id)));

        return forkJoin(requests);
    }

    /**
     * Obtém um registro.
     * @param id ID do registro.
     */
    protected getStatic(id: string): Observable<T> {
        const item = this.items?.find((i) => i.id === id);
        if (item) of(item);

        return new Observable();
    }

    /**
     * Cria um novo registro.
     * @param data Dados do registro.
     */
    protected addStatic(data: T): Observable<T> {
        this.items?.push(data);
        return of(data);
    }

    /**
     * Atualiza os dados de um registro.
     * @param data Dados a serem atualizados.
     */
    protected editStatic(data: T): Observable<T> {
        if (this.items) {
            const index = this.items.findIndex((i) => i.id === data.id);
            this.items[index] = data;
        }

        return of(data);
    }

    /**
     * Exclui o registro informado.
     * @param id ID do registro a ser excluído.
     */
    protected removeStatic(id: string): Observable<boolean> {
        if (this.items) {
            const index = this.items.findIndex((i) => i.id === id);
            this.items.splice(index, 1);
        }

        return of(true);
    }

	

    /**
     * Obtém uma URL com o controle base.
     * @param action Action.
     */
    protected getUrl(action: string): string {
        const baseController = this.baseController ?? "";
        return `${baseController}${action.length > 0 ? "/" + action : ""}`;
    }

    /**
     * Verifica se a URL é absoluta.
     * Serão consideradas URLs absolutas as que iniciarem com "[protocolo]://".
     *  - Protocolos aceitos: http, https, ftp, ftps
     * @param url URL.
     */
    private isAbsoluteUrl(url?: string): boolean {
        if (!url) return false;

        return /^(f|ht)tps?:/i.test(url);
    }
}