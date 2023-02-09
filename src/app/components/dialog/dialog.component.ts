import { 
	Component,
	ViewChild,
	ViewContainerRef,
	ComponentFactoryResolver,
	Input,
	SimpleChanges,
	TemplateRef,
	RendererFactory2,
	Injector,
	ElementRef,
	ViewChildren,
	ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { DialogComponentConfig } from './models/dialog-component-config';
import { DialogConfig } from './models/dialog-config';

// import { Modal, ModalService } from './modal.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
	@ViewChildren("modalContent") modalContent: ElementRef<HTMLDivElement>[];
    @ViewChild("dialogContainer", { read: ViewContainerRef }) container: ViewContainerRef;
	@Input('config') config: DialogConfig;
	@Input('componentConfig') componentConfig: DialogComponentConfig<any>;
	@Input('closeSubject') closeSubject: Subject<any>;
    
	safeHtml: SafeHtml

    constructor(
        private sanitized: DomSanitizer,
        private resolver: ComponentFactoryResolver,
		private changeDetect: ChangeDetectorRef) { }

	changes = (): void => {
		this.changeDetect.detectChanges();
		if (this.config)  {
			if (this.config.innerHtml) {
				this.safeHtml = this.sanitized.bypassSecurityTrustHtml(this.config.innerHtml);
			}
		} else if (this.componentConfig)  {
			const factory = this.resolver.resolveComponentFactory(this.componentConfig.component);
			this.componentConfig._componentRef = this.container.createComponent(factory);
			
			this.componentConfig._componentRef.instance.data = this.componentConfig.data;
			(this.componentConfig._componentRef.instance as any)._closeSubject = this.closeSubject;
		}
	}

    onClose(): void {
        this.container.clear()
		this.closeSubject.next()
    }

    callCallback(index: number) {
        if (this.config.actions[index] && this.config.actions[index].callback)
            this.config.actions[index].callback();
     
        this.container.clear()
		this.closeSubject.next()
    }
}
