import { 
	ApplicationRef,
	ComponentFactoryResolver,
	Injectable,
	Injector,
	Renderer2,
	RendererFactory2 
} from "@angular/core";

import { ComponentType } from "../models/component.type";
import { Layer } from "../models/layer"; 

@Injectable({
	providedIn: 'root'
})
export class LayerService {
	private readonly renderer: Renderer2;

	constructor(
		rendererFactory: RendererFactory2,
		private app: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector
	) {
		this.renderer = rendererFactory.createRenderer(null, null);
	 }

	/** cria uma camada para apresentar um componente em primeiro plano */
	public createLayer<T>(componentType: ComponentType<T>): Layer<T> {
		let layer = this.newLayer<T>(componentType);
        this.app.attachView(layer._component.hostView);

		// TODO: Arrumar outra forma de passar o openSubject para o component instanciado
		(layer._component.instance as any).layer = layer;
		// END TODO;
		

		return layer;
	}

	private newLayer<T>(componentType: ComponentType<T>): Layer<T> {
		var layer = new Layer<T>(this.renderer);

		

		// create component
		layer._component = this.componentFactoryResolver.resolveComponentFactory(componentType).create(this.injector, [], layer._container);
		return layer;
	}
}
