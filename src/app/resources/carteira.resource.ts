import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Carteira } from "../models/carteira.model";
import { Lancamento } from "../models/lancamento.model";
import { RequestModel } from "../models/request.model";
import { RequestService } from "../services/request.service";
import { BaseModelResource } from "./base-model.resource";

@Injectable({
	providedIn: 'root'
})
export class CarteiraResource extends BaseModelResource<Carteira> {
	
	constructor(requestService: RequestService) {
		super(requestService);
		
		this.baseController = 'carteira';
	}

	ativar(id: string): Observable<Carteira> {
        if (this.requestService)
            return this.requestService.makePost(
                new RequestModel({
                    url: `${this.getUrl('ativar')}`,
                    id: id,
                    isAbsolute: this._isAbsoluteUrl,
                })
            );

        return new Observable();
    } 

	lancamentos(id: string, pageSize:number, pageIndex: number): Observable<Lancamento[]> {
        if (this.requestService)
            return this.requestService.makePost(
                new RequestModel({
                    url: `${this.getUrl('lancamentos')}`,
                    id: id,
					data: { pageSize, pageIndex },
                    isAbsolute: this._isAbsoluteUrl,
                })
            );

        return new Observable();
	}
}