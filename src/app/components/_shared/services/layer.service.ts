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

		// create background ( hide layer on container blur )
		layer._backGround = layer._renderer.createElement('div');
		layer._renderer.setProperty(layer._backGround, 'id', `floating-layer-background-${layer.id}`);
		layer._renderer.setStyle(layer._backGround, 'z-index', '-1') // Initial (on Open set 500 + id)
		layer._renderer.setStyle(layer._backGround, 'position', 'absolute')
		layer._renderer.setStyle(layer._backGround, 'top', '0')
		layer._renderer.setStyle(layer._backGround, 'left', '0')
		layer._renderer.setStyle(layer._backGround, 'width', '100%')
		layer._renderer.setStyle(layer._backGround, 'height', '100%')
		layer._renderer.setStyle(layer._backGround, 'display', 'flex')
		layer._renderer.setStyle(layer._backGround, 'justify-content', 'center')
		layer._renderer.setStyle(layer._backGround, 'align-items', 'center')
		layer._renderer.appendChild(document.body, layer._backGround);
		layer._backGround.onclick = () => {

			if (layer.closeOnBlur){
				layer.closeSubject.next();
			}
		}

		// create container ( encapsulate component to prevent blur on interaction )
		layer._container = layer._renderer.createElement('div');
		layer._renderer.setProperty(layer._container, 'id', `floating-layer-${layer.id}`);
		layer._renderer.appendChild(layer._backGround, layer._container);
		layer._container.onclick = (ev: MouseEvent) => {
			ev.preventDefault();
			ev.stopPropagation();
		}

		// create component
		layer._component = this.componentFactoryResolver.resolveComponentFactory(componentType).create(this.injector, [], layer._container);
		return layer;
	}
}
