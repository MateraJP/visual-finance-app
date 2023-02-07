import { Injectable } from "@angular/core";
import { Criterio } from "../models/criterio.model";
import { RequestService } from "../services/request.service";
import { BaseModelResource } from "./base-model.resource";

@Injectable({
	providedIn: 'root'
})
export class CriterioResource extends BaseModelResource<Criterio> {
	
	constructor(requestService: RequestService) {
		super(requestService);
		
		this.baseController = 'grupoDespesa';
	}
}