import { ComponentRef, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";

/** Instância de camada criada pelo LayerService */
export class Layer<T> {
	static identity: number = 0;
	private listen: () => void;

	private _id: number;
	/** Sequencial único: auto-gerado */
	get id(): number {
		return this._id;
	}

	private _openSubject = new Subject<undefined>();
	/** Subject utilizado para apresentar camada em primeiro plano */
	get openSubject(): Subject<undefined> {
		return this._openSubject;
	} 

	private _closeSubject = new Subject<undefined>();
	/** Subject utilizado para esconder camada */
	get closeSubject(): Subject<undefined> {
		return this._closeSubject;
	} 

	private _destroySubject = new Subject<undefined>();
	/** Subject utilizado para destroir instancia de camada */
	get destroySubject(): Subject<undefined> {
		return this._destroySubject;
	} 

	/** Indica se a camada é ocultada ao clicar fora do componente exibido */
	closeOnBlur: boolean = true;
	
	/** Reduz o foco dos objetos em segundo plano (0 - 100) */
	backgroundBlur: number = 0;

	/** Aplica uma cor de fundo. (#112233 / rgba(1, 2, 3, 0.5) / grey / ...) */
	backgroundColor: string = 'rgba(0, 0, 0, 0.3)';

	/** Renderer contendo as camadas de primeiro plano !Utilização interna!  */
	_renderer: Renderer2;

	/** Fundo sobre a tela do app para apresentar o componente em primeiro plano. pode ser usado para atribuir style !Utilização interna!  */
	_backGround: HTMLDivElement;

	/** Container do componente. pode ser usado para atribuir style !Utilização interna!  */
	_container: HTMLDivElement;

	/** Acesso a instancia do componente. pode ser usado para passar dados !Utilização interna! */
	_component: ComponentRef<T>;
	
	// TODO: Drag to move option

	constructor(renderer: Renderer2) {
		this._id = Layer.identity++;
		this._renderer = renderer;
		// create background ( hide layer on container blur )
		this._backGround = this._renderer.createElement('div');
		this._renderer.setProperty(this._backGround, 'id', `floating-this-background-${this.id}`);
		this._renderer.setStyle(this._backGround, 'z-index', '-1') // Initial (on Open set 500 + id)
		this._renderer.setStyle(this._backGround, 'position', 'absolute')
		this._renderer.setStyle(this._backGround, 'top', '0')
		this._renderer.setStyle(this._backGround, 'left', '0')
		this._renderer.setStyle(this._backGround, 'width', '100%')
		this._renderer.setStyle(this._backGround, 'height', '100%')
		this._renderer.setStyle(this._backGround, 'display', 'flex')
		this._renderer.setStyle(this._backGround, 'justify-content', 'center')
		this._renderer.setStyle(this._backGround, 'align-items', 'center')
		this._renderer.appendChild(document.body, this._backGround);
		this._backGround.onclick = () => {
			if (this.closeOnBlur){
				this.closeSubject.next();
			}
		}

		// create container ( encapsulate component to prevent blur on interaction )
		this._container = this._renderer.createElement('div');
		this._renderer.setProperty(this._container, 'id', `floating-this-${this.id}`);
		this._renderer.setStyle(this._container, 'margin', `auto`);
		this._renderer.appendChild(this._backGround, this._container);
		this._container.onclick = (ev: MouseEvent) => {
			ev.preventDefault();
			ev.stopPropagation();
		}
		
		this._openSubject.subscribe({
			next: () => {
				this._renderer.setStyle(this._backGround, 'z-index', 500 + this.id)
				this._renderer.setStyle(this._backGround, 'backgroundColor', this.backgroundColor)
				document.getElementById('layout-container').style.filter = `blur(${this.backgroundBlur}px)`;

				this.listen = this._renderer.listen(document.body, 'keyup', (ev: KeyboardEvent) => {
					if (ev.key == 'Escape') {
						ev.stopPropagation();
						ev.preventDefault();
						this.closeSubject.next();
					}
				})
			}
		})
		

		this._closeSubject.subscribe({
			next: () => {
				if (this.listen) this.listen();
				this._renderer.setStyle(this._backGround, 'z-index', '-1')
				document.getElementById('layout-container').style.filter = '';
			}
		})
		
		this._destroySubject.subscribe({
			next: () => {
				this._renderer.removeChild(document.body, this._backGround);
			}
		})


	}
}