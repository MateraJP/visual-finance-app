import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Renderer2, RendererFactory2 } from "@angular/core";
import { Subject } from "rxjs";
import { ComponentType } from "../models/component.type";

@Injectable({
	providedIn: 'root'
})
export class LayerService {
	constructor(
		private rendererFactory: RendererFactory2,
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector,
		private app: ApplicationRef
	) { }

	public createHoverComponent<T>(component: ComponentType<T>): Layer<T> {
		// TODO: Position Strategy
		let factory = this.componentFactoryResolver.resolveComponentFactory(component);
		let layer = this.createLayer<T>();

	 	layer.component = factory.create(this.injector, [["layer", layer]], layer.container);
          this.app.attachView(layer.component.hostView);

		(layer.component.instance as any).layer = layer;
		layer.destroySubject.subscribe({
			next: () => {
				this.onDestroy(layer);
			}
		})

		return layer;
	}

	private onDestroy(layer: Layer<any>): void {
		layer.renderer.removeChild(document.body, layer.container);
	}

	private createLayer<T>(): Layer<T> {
		var layer = new Layer<T>();
		layer.renderer = this.rendererFactory.createRenderer(null, null);
		layer.container = layer.renderer.createElement('div');
		
		layer.renderer.setProperty(layer.container, 'id', 'floating-layer');
		layer.renderer.setStyle(layer.container, 'z-index', '-1')
		layer.renderer.setStyle(layer.container, 'position', 'absolute')
		layer.renderer.setStyle(layer.container, 'top', '0')
		layer.renderer.setStyle(layer.container, 'left', '0')
		// TODO: Position Strategy (full-screen)
		layer.renderer.setStyle(layer.container, 'width', '100%')
		layer.renderer.setStyle(layer.container, 'height', '100%')
		// TODO: Position Strategy (align child on center)
		// layer.renderer.setStyle(this.div, 'display', 'flex')
		// layer.renderer.setStyle(this.div, 'justify-content', 'center')
		// layer.renderer.setStyle(this.div, 'align-items', 'center')
		// TODO: Position Strategy (floating childs)
		// layer.renderer.setStyle(layer.container, 'width', '0px')
		// layer.renderer.setStyle(layer.container, 'height', '0px')
		layer.renderer.appendChild(document.body, layer.container);
		layer.container.onclick = (ev: MouseEvent) => {
			if(layer.closeOnBlur) {
				layer.closeSubject.next();
			}
		}
		
		// let div2 = layer.renderer.createElement('div');
		// layer.renderer.setProperty(div2, 'id', 'floating-div');
		// layer.renderer.setStyle(div2, 'z-index', '200')
		// // TODO: Position Strategy (floating childs)
		// layer.renderer.setStyle(layer.container, 'position', 'absolute')
		// layer.renderer.setStyle(layer.container, 'top', `${100 + this.layers.length * 100}px`)
		// layer.renderer.setStyle(layer.container, 'left', `${100 + this.layers.length * 100}px`)
		// //
		// layer.renderer.setStyle(div2, 'width', '300px')
		// layer.renderer.setStyle(div2, 'height', '500px')
		// layer.renderer.setStyle(div2, 'background-color', 'red')
		// layer.renderer.appendChild(layer.container, div2);
		// div2.onclick = (ev: MouseEvent) => {
		// 	ev.preventDefault();
		// 	ev.stopPropagation();
		// 	console.log('pingpoing child', ev.x, ev.y);
		// }

		return layer;
	}
}

export class Layer<T> {
	static identity: number = 0;
	id: number;
	renderer: Renderer2;
	container: HTMLDivElement;
	component: ComponentRef<T>;

	closeOnBlur = true;
	
	_openSubject = new Subject<undefined>();
	_closeSubject = new Subject<undefined>();
	_destroySubject = new Subject<undefined>();
	// TODO: positionStrategy 

	get openSubject(): Subject<undefined> {
		return this._openSubject;
	} 

	get closeSubject(): Subject<undefined> {
		return this._closeSubject;
	} 

	get destroySubject(): Subject<undefined> {
		return this._destroySubject;
	} 

	constructor(init?: Partial<Layer<T>>) {
		this.id = Layer.identity++;
		this._openSubject.subscribe({
			next: () => {
				// TODO: checkpositionStrategy
				this.renderer.setStyle(this.container, 'z-index', '100')
			}
		})

		this._closeSubject.subscribe({
			next: () => {
				console.log();
				this.renderer.setStyle(this.container, 'z-index', '-1')
			}
		})
	}
}