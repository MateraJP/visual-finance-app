import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lancamento } from "../models/lancamento.model";
import { RequestModel } from "../models/request.model";
import { RequestService } from "../services/request.service";
import { BaseModelResource } from "./base-model.resource";

@Injectable({
	providedIn: 'root'
})
export class LancamentoResource extends BaseModelResource<Lancamento> {
	
	constructor(requestService: RequestService) {
		super(requestService);
		
		this.baseController = 'lancamento';
	}
}