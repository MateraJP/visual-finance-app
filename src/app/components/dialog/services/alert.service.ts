import { Injectable } from "@angular/core";
import { DialogModule } from "../dialog.module";
import { DialogService } from "./dialog.service";
import { DialogConfig } from "../models/dialog-config";
import { DialogInstance } from "../models/dialog-instance";
import { DialogType } from "../models/dialog-type.enum";

@Injectable({
	providedIn: DialogModule
})
export class AlertService {
	private alerts: DialogInstance[] = [];

	constructor(private dialogService: DialogService) { } 

	/** Limpa qualquer alerta em exibição */
	clear(): void {
		this.alerts.forEach(alert => alert.closeSubject.next());
	}

	/** Exibe uma mensagem informativa */
	info(message: string): DialogInstance {
		return this.show(new DialogConfig({
			tipo: DialogType.Information,
			mensagem: message,
			canClose: false,
			canScape: false
		}));
	}

	/** Exibe um alerta */
	warn(message: string): DialogInstance {
		return this.show(new DialogConfig({
			tipo: DialogType.Warn,
			mensagem: message,
			canClose: false,
			canScape: false
		}));
	}

	/** Exibe uma mensagem de erro */
	error(message: string): DialogInstance {
		return this.show(new DialogConfig({
			tipo: DialogType.Error,
			mensagem: message,
			canClose: false,
			canScape: false
		}));
	}

	/** Exibe uma mensagem de confirmação, passando para o callback { result: boolean } */
	confirmation(message: string, callback: any): DialogInstance {
		return this.show(new DialogConfig({
			tipo: DialogType.Error,
			mensagem: message,
			canClose: false,
			canScape: false,
			actions: [ {
				class: 'primary',
				texto: 'Confirmar',
				callback: () => callback(true),
			},
			{
				class: 'secundary',
				texto: 'Cancelar',
				callback: () => callback(false),
			}]
		}));
	}

	private show(config: DialogConfig): DialogInstance {
		let alert = this.dialogService.showDialog(config)
		
		alert.closeSubject.subscribe({
			next: () => {
				console.log(this.alerts, this.alerts.indexOf(alert));
				this.alerts.splice(this.alerts.indexOf(alert), 1);
				console.log(this.alerts);
			}
		})

		this.alerts.push(alert);
		return alert;
	}
}