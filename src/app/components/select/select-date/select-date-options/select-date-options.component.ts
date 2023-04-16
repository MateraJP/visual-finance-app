import { 
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

import { Cartesiano, Direction } from '../../../touch-track/touch-track.directive';
import { Layer } from '../../../_shared/models/layer';
import { SelectDateType } from '../../models/select-date-type';
import { DateModel, DateSettings } from '../date-settings';

@Component({
    selector: 'app-select-date-options',
    templateUrl: './select-date-options.component.html',
    styleUrls: ['./select-date-options.component.scss']
})
export class SelectDateOptionsComponent implements OnInit {
    @ViewChild('box') box: ElementRef<HTMLDivElement>;
    @Input('clientRect') clientRect: DOMRect = new DOMRect();
    @Input('layer') layer: Layer<SelectDateOptionsComponent>
    @Input('selectSubject') select: Subject<any>;
    @Input('type') selectionType: SelectDateType = SelectDateType.Day;

	isOpen: boolean = false;
    current : 'front' | 'left' | 'right' | 'top' | 'bottom' = 'front';
    sides: DateSide[] = [];
    currentSelectionType: SelectDateType = SelectDateType.Day;
    selected: Date = new Date();
    DateSettings = DateSettings;
	Direction = Direction;
	
	// TODO: Current != de Selected
	todayYear: number;
	todayMonth: number;
	todayDay: number;

	/* Para visualização e controle - Inicializa com a data informada ou com a data atual */
	selectedYear: number;
	selectedMonth: number;
	selectedDay: number;
	selectedHour: number = 0;
	selectedMinute: number = 0;

	/* Para visualização e controle - Inicializa com a data informada ou com a data atual */
	currentYear: number;
	currentMonth: number;
	currentDay: number;
	currentHour: number = 0;
	currentMinute: number = 0;

	/* Para as opções disponíveis */
	rangeYear: DateModel[] = [];
	rangeMes: DateModel[] = [];
	rangeDia: DateModel[] = [];
	rangeSemana = DateSettings.daysofweek.map(d => d.substring(0, 1));
	rangeHora: number[] = DateSettings.hours;
	rangeMinute: number[] = DateSettings.minutes;
	
    /* TouchConfiguration */
	swapAction = new Subject<Direction>()

	//------------------------------------------------------//
    constructor(private changeDetect: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.changeDetect.detectChanges();
        this.layer.openSubject.subscribe({
            next: () => { 
                this.isOpen = true;
            }
        })

        this.layer.closeSubject.subscribe({
            next: () => {
                this.isOpen = false;
				this.currentSelectionType = this.selectionType;
            }
        })

		this.swapAction.subscribe({
			next: this.turn.bind(this)
		})
        
        this.box.nativeElement.style.transition = 'transform 0.5s';
        var today = new Date();

		// Inicializando valores para data de hoje
		this.todayYear = today.getFullYear();
		this.todayMonth = today.getMonth();
		this.todayDay = today.getDate();

		// Inicializando valores correntes (TODO: Criar forma para atualizar valor pelo component de fora)
		this.currentYear = today.getFullYear();
		this.currentMonth = today.getMonth();
		this.currentDay = today.getDate();

		// Inicializando Ranges
		let floor = (Math.floor(this.currentYear / 12) * 12);
		this.rangeYear = [];
		for(var x = 0; x < 12; x++) {
			this.rangeYear.push(new DateModel(floor + x));
		}

		this.rangeMes = [];
		for(var x = 0; x < 12; x++) {
			this.rangeMes.push(new DateModel(this.currentYear, x));
		}

		this.rangeDia = DateSettings.dayOptions(this.currentYear, this.currentMonth);
        
		// Inicializando Cubo
		let front = new DateSide({type: this.currentSelectionType, position: 'front'})
        this.sides.push(front, front.left, front.right, front.top, front.bottom);
    } 

    onSelect(e: MouseEvent, value: DateModel): void {
        e.preventDefault();
        e.stopPropagation();

		setTimeout(() => {
			if (this.currentSelectionType == SelectDateType.Year) {
				this.currentYear = value.ano;
				
				if (this.selectionType == SelectDateType.Year) {
					this.select.next(value);
				}
				else {
					this.turn(Direction.Down, true);
					this.rangeMes = [];
					for(var x = 0; x < 12; x++) {
						this.rangeMes.push(new DateModel(this.currentYear, x));
					}
					this.currentSelectionType = SelectDateType.Month;
				}
			} 
			else if (this.currentSelectionType == SelectDateType.Month) {
				this.currentMonth = value.mes;

				if (this.selectionType == SelectDateType.Month) {
					this.select.next(value);
				}
				else {
					this.turn(Direction.Down, true);
					this.rangeDia = DateSettings.dayOptions(this.currentYear, this.currentMonth);
					this.currentSelectionType = SelectDateType.Day;
				}
			}
			else if (this.currentSelectionType == SelectDateType.Day) {
				this.currentDay = value.dia;
				this.selectedDay = value.dia;
				this.selectedMonth = value.mes;
				this.selectedYear = value.ano;

				if (this.selectionType == SelectDateType.Day) {
					this.select.next(value);
				}
				else {
					this.turn(Direction.Down, true);
					this.currentSelectionType = SelectDateType.Time;
				}
			}
		}, 120)
    }

    changeSelection(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
		
		if (this.currentSelectionType == SelectDateType.Time || this.currentSelectionType == SelectDateType.Day || this.currentSelectionType == SelectDateType.Month) {
			this.turn(Direction.Up, true);
		}
		setTimeout(() => {
            if (this.currentSelectionType == SelectDateType.Time) {
                this.currentSelectionType = SelectDateType.Day;
            } 
			else if (this.currentSelectionType == SelectDateType.Day) {
				this.rangeMes = [];
				for(var x = 0; x < 12; x++) {
					this.rangeMes.push(new DateModel(this.currentYear, x));
				}
                this.currentSelectionType = SelectDateType.Month;
            } 
            else if (this.currentSelectionType == SelectDateType.Month) {
				let floor = (Math.floor(this.currentYear / 12) * 12);
				this.rangeYear = [];
				for(var x = 0; x < 12; x++) {
					this.rangeYear.push(new DateModel(floor + x));
				}
                this.currentSelectionType = SelectDateType.Year;
            }
        }, 120)
    }

    makeTurn = (e: MouseEvent, direction: Direction): void => {
        e.preventDefault();
        e.stopPropagation();
        this.turn(direction);
    }

	selectToday(): void {
		this.select.next(new DateModel(this.todayYear, this.todayMonth, this.todayDay));
	}
	clear(): void {
		this.select.next(undefined);
	}

    private turn(direction: Direction, changeSelections: boolean = false): void {
        if (direction == Direction.Left) {
            this.current = 'left'
        } else if (direction == Direction.Right) {
            this.current = 'right'
        } else if (direction == Direction.Up && (this.currentSelectionType == SelectDateType.Day || changeSelections)) {
            this.current = 'top'
        } else if (direction == Direction.Down && (this.currentSelectionType == SelectDateType.Day || changeSelections)) {
            this.current = 'bottom'
        } else {
            return
        }
        this.box.nativeElement.className = `box show-${this.current}`;

        // Resetar posições para a o lado atual
        setTimeout(this.reset.bind(this), 500)
        setTimeout(() => {
			if ((this.currentSelectionType == SelectDateType.Day) && direction == Direction.Right) {
				if (this.currentMonth > 10) {
					this.currentMonth = 0;
					this.currentYear++;
				} else {
					this.currentMonth++;
				}

				this.rangeDia = DateSettings.dayOptions(this.currentYear, this.currentMonth);
			} 
			else if ((this.currentSelectionType == SelectDateType.Day) && direction == Direction.Left) {
				if (this.currentMonth < 1) {
					this.currentMonth = 11;
					this.currentYear--;
				} else {
					this.currentMonth--;
				}

				this.rangeDia = DateSettings.dayOptions(this.currentYear, this.currentMonth);
			} 
			else if ((this.currentSelectionType == SelectDateType.Day) && direction == Direction.Up) {
				this.currentYear--;
				this.rangeDia = DateSettings.dayOptions(this.currentYear, this.currentMonth);
			} 
			else if ((this.currentSelectionType == SelectDateType.Day) && direction == Direction.Down) {
				this.currentYear++;
				this.rangeDia = DateSettings.dayOptions(this.currentYear, this.currentMonth);
			} 
			else if ((this.currentSelectionType == SelectDateType.Month) && direction == Direction.Right) {
				if (this.currentYear < 3000) {
					this.currentYear++;
					
					this.rangeMes = [];
					for(var x = 0; x < 12; x++) {
						this.rangeMes.push(new DateModel(this.currentYear, x));
					}
					this.currentSelectionType = SelectDateType.Month;
				}
			} 
			else if ((this.currentSelectionType == SelectDateType.Month) && direction == Direction.Left) {
				if (this.currentYear > 0) {
					this.currentYear--;

					this.rangeMes = [];
					for(var x = 0; x < 12; x++) {
						this.rangeMes.push(new DateModel(this.currentYear, x));
					}
					this.currentSelectionType = SelectDateType.Month;
				}
			} 
			else if (this.currentSelectionType == SelectDateType.Year && direction == Direction.Right) {
				let floor = (this.rangeYear[0].ano + 12);
				this.rangeYear = [];
				for(var x = 0; x < 12; x++) {
					this.rangeYear.push(new DateModel(floor + x));
				}
			} 
			else if (this.currentSelectionType == SelectDateType.Year && direction == Direction.Left) {
				let floor = (this.rangeYear[0].ano - 12);
				this.rangeYear = [];
				for(var x = 0; x < 12; x++) {
					this.rangeYear.push(new DateModel(floor + x));
				}
			} 
		}, 200)
    }

    private reset(): void {

        // remove transition
        this.box.nativeElement.style.transition = '';

        // fix current position
        if (this.current == 'left') {
            // remove old
            this.sides.splice(this.sides.findIndex(f => f.position == 'right'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'top'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'bottom'), 1)
            // change current
            var front = this.sides.filter(f => f.position == 'front')[0];
            var left = this.sides.filter(f => f.position == 'left')[0];
            front.position = 'right';
            left.position = 'front';
            // add new ones
            this.sides.push(left.left, left.top, left.bottom);  
        } 
        else if (this.current == 'right') {
            // remove old
            this.sides.splice(this.sides.findIndex(f => f.position == 'left'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'top'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'bottom'), 1)
            // change current
            var front = this.sides.filter(f => f.position == 'front')[0];
            var right = this.sides.filter(f => f.position == 'right')[0];
            front.position = 'left';
            right.position = 'front';
            // add new ones
            this.sides.push(right.right, right.top, right.bottom);  
        }
        else if (this.current == 'top') {
            // remove old
            this.sides.splice(this.sides.findIndex(f => f.position == 'left'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'right'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'bottom'), 1)
            // change current
            var front = this.sides.filter(f => f.position == 'front')[0];
            var top = this.sides.filter(f => f.position == 'top')[0];
            front.position = 'bottom';
            top.position = 'front';
            // add new ones
            this.sides.push(top.left, top.right, top.top);  
        }
        else if (this.current == 'bottom') {
            // remove old
            this.sides.splice(this.sides.findIndex(f => f.position == 'left'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'right'), 1)
            this.sides.splice(this.sides.findIndex(f => f.position == 'top'), 1)
            // change current
            var front = this.sides.filter(f => f.position == 'front')[0];
            var bottom = this.sides.filter(f => f.position == 'bottom')[0];
            front.position = 'top';
            bottom.position = 'front';
            // add new ones
            this.sides.push(bottom.left, bottom.right, bottom.bottom);  
        }

        this.box.nativeElement.className = `box show-front`;
        this.current = 'front'
        setTimeout(() => {
            this.box.nativeElement.style.transition = 'transform 0.5s';
        }, 30)
    }

    // private getValue(date: Date, type: SelectDateType, side: 'left' | 'right' | 'top' | 'bottom') : Date {
    //     if (side == 'left') {
    //         if (type == SelectDateType.Date) 
    //             return new Date(date.getFullYear(), date.getMonth() - 1);
    //         else if (type == SelectDateType.Month) 
    //             return new Date(date.getFullYear() - 1);
    //         else if (type == SelectDateType.) 
    //     }
    // }
}

export class DateSide {
    type: SelectDateType ;
    position: 'front' | 'left' | 'right' | 'top' | 'bottom';
    
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;

    get left(): DateSide {
        return new DateSide({
            type: this.type,
            position: 'left',
            day: this.day,
            month: this.getMonth('left'),
            year: this.getYear('left')
        })
    }

    get right(): DateSide {
        return new DateSide({
            type: this.type,
            position: 'right',
            day: this.day,
            month: this.getMonth('right'),
            year: this.getYear('right')
        })
    }

    get top(): DateSide {
        return new DateSide({
            type: this.type,
            position: 'top',
            day: this.day,
            month: this.getMonth('top'),
            year: this.getYear('top')
        })
    }

    get bottom(): DateSide {
        return new DateSide({
            type: this.type,
            position: 'bottom',
            day: this.day,
            month: this.getMonth('bottom'),
            year: this.getYear('bottom')
        })
    }
    
    private getMonth?(side: 'left' | 'right' | 'top' | 'bottom'): any {
        switch(this.type) {
            case SelectDateType.Day: 
                if (side == 'left') return this.month == 0 ? 11 : this.month - 1;
                else if (side == 'right') return this.month == 11 ? 0 : this.month + 1;
                else if (side == 'top') return this.month; 
                else if (side == 'bottom') return this.month;
                break;
            default:
                return this.month;
        }
    }
    
    private getYear?(side: 'left' | 'right' | 'top' | 'bottom'): any {
        switch(this.type) {
            case SelectDateType.Day: 
                if (side == 'left') return this.month == 0 ? this.year - 1 : this.year;
                else if (side == 'right') return this.month == 11 ? this.year + 1 : this.year;
                else if (side == 'top') return this.year + 1;
                else if (side == 'bottom') return this.year - 1;
                break;
            case SelectDateType.Month: 
                if (side == 'left') return this.year - 1;
                else if (side == 'right') return this.year + 1;
                else if (side == 'top') return this.year + 1;
                else if (side == 'bottom') return this.year - 1;
                break;
            default:
                return this.year;
        }
    }

    constructor(init?: Partial<DateSide>) {
        Object.assign(this, init);
    }
}