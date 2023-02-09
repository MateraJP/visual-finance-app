import { Injectable } from "@angular/core";

import { LayerService } from "../../_shared/services/layer.service";
import { DialogComponent } from "../dialog.component";
import { DialogModule } from "../dialog.module";
import { DialogComponentBase } from "../models/dialog-component-base";
import { DialogComponentConfig } from "../models/dialog-component-config";
import { DialogConfig } from "../models/dialog-config";
import { DialogInstance } from "../models/dialog-instance";

@Injectable({
	providedIn: DialogModule,
  })
export class DialogService {
    constructor(
		private layerService: LayerService
	) { }

	/** Exibe uma caixa de diálogo em primeiro plano */
	showDialog(config: DialogConfig): DialogInstance
	/** Exibe um componente em caixa de diálogo em primeiro plano */
	showDialog<T extends DialogComponentBase>(config: DialogComponentConfig<T>): DialogInstance {
		let layer = this.layerService.createLayer(DialogComponent)
		layer.backgroundBlur = 1;

		if (config instanceof(DialogConfig)) {
			layer._component.instance.config = config;
			layer._component.changeDetectorRef.detectChanges();
		} else if (config instanceof(DialogComponentConfig)) {
			layer._component.instance.componentConfig = config;
		}

		layer._component.instance.closeSubject = layer.closeSubject;
		layer.closeOnBlur = config.canClose;

		// on close, destroy layer
		layer.closeSubject.subscribe({
			next: () => {
				layer.destroySubject.next();
			}
		})

		layer.openSubject.next();
		layer._component.instance.changes();
		return new DialogInstance(layer);
	}
}
