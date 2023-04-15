import { Directive, ElementRef, forwardRef, HostListener, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
    selector: '[mask]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaskDirective),
            multi: true
        }
    ]
})
export class MaskDirective implements OnInit {
    @Input() mask: string = '';
    @Input() prefix: string = '';
    @Input() sufix: string = '';
    /*
    Interpretation:
    0 = 0-9 optional
    9 = 0-9 mandatory
    [n¹ - n²] = de n¹ a n² optional
    [n¹ - n²] = de n¹ a n² mandatory

    [a-z] - letters lowerCase
    [A-Z] - letters upperCase
    \w    - alpha-numeric lowerCase
    \W    - alpha-numeric upperCase    
   
    \   forbiden
    [ ] begin and end of a clausule
    |   type separator - to informe multiple types
    { } begin and end of higher clausule
    / , - . : ; ( ) & % $ # @ ! ? ^ ~ ª º Symbols
    */
    // private currentVal: string = '';
    // private currentMaskedVal: string = '';
    private maskOptions: string[] = [];

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.el.nativeElement.placeholder = this.mask;
        this.maskOptions.push(this.mask);
    }

    @HostListener('input', ['$event'])
    onInput(event: KeyboardEvent): void {
        this.applyMask();

        if (this.el.nativeElement.value && this.el.nativeElement.value.length > (this.prefix.length + this.mask.length + this.sufix.length)) {
            
            if (this.el.nativeElement.value.endsWith(this.sufix)) {
                this.el.nativeElement.value = this.el.nativeElement.value.slice(0, (this.sufix.length * - 1))
            }

            this.el.nativeElement.value = this.el.nativeElement.value.slice(0, -1);
            this.el.nativeElement.value += this.sufix;
        } 

        let end = this.el.nativeElement.value.length - this.sufix.length;
        this.el.nativeElement.setSelectionRange(end, end);
    }

    @HostListener('blur')
    onBlur(): void {
        this.applyMask();
        //TODO: validate
    }

    @HostListener('click', ['$event'])
    onFocus(event: MouseEvent | KeyboardEvent): void {

    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        // this.applyMask();
        // Permitir apagar valores com backslash del ou delete
        // if (event.key == 'Backspace' || event.key == 'Delete') {
        // }

        // Value before input of event.
        // this.el.nativeElement.value


        // call preventDefault to prevent next key 
        // event.preventDefault();
    }
    
    @HostListener('paste', ['$event'])
    onPaste(event: KeyboardEvent | any): void {
        
    }
  
    private applyMask(): void {
        if (this.el.nativeElement.value && this.el.nativeElement.value.length > 0) {
            let currentVal:string = this.el.nativeElement.value;

            if (this.prefix.length > 0 && currentVal.startsWith(this.prefix)) {
                currentVal = currentVal.replace(this.prefix, '');
            }
            if (this.sufix.length > 0 && currentVal.endsWith(this.sufix)) {
                currentVal = currentVal.slice(0, (this.sufix.length * - 1))
            }
            
            let currentMaskedVal = '';
            for(let x = 0; x < currentVal.length; x++) {
                currentMaskedVal += this.returnMounted(currentMaskedVal.length, currentVal[x]);
            }
            
            this.el.nativeElement.value = this.prefix + currentMaskedVal + this.sufix;
        }
    }

    private returnMounted(pos: number, value: string): string {
        let option = this.maskOptions[0][pos]
        
        if((!option) || pos >= this.maskOptions[0].length) {
            // return empty when exceded length
            // todo: check maskOptions[1..2..3...]
            return '';
        }
        
        // if Option is NaN then 
        if (isNaN(Number(option)) || option === ' ') {
            if (option === value) {
                return value;
            } else {
                return option + this.returnMounted(pos + 1, value);
            }
        } 

        if (isNaN(Number(value))) {
            return '';
        }
        else {
            return value;
        }
    }

    // 000.000.000-00
    private maskCPF = value => {
        return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    };

    
    // (00) 00000-0000
    private maskPhone = value => {
        return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
    };
}