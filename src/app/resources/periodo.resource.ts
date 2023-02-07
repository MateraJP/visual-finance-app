import { Injectable } from "@angular/core";
import { Periodo } from "../models/periodo.model";
import { RequestService } from "../services/request.service";
import { BaseModelResource } from "./base-model.resource";

@Injectable({
	providedIn: 'root'
})
export class PeriodoResource extends BaseModelResource<Periodo> {
	
	constructor(requestService: RequestService) {
		super(requestService);
		
		this.baseController = 'periodo';
	}
}