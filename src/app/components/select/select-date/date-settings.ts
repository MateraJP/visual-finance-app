export class DateSettings {
	// todo: utilizar angular culture
	static culture: 'en-US' | 'pt-BR' = 'pt-BR'
	
	static month(i: number) : string {
		return this.months[i];
	}
	static monthAbv(monthAbv: string): string {
		let i = this.monthsAbrv.findIndex(f => f == monthAbv);
		if (i < 0) throw Error("not found");

		return this.months[i];
	}
	static findMonth(monthAbv: string): number {
		let i = this.monthsAbrv.findIndex(f => f == monthAbv);
		if (i < 0) throw Error("not found");

		return i;
	}
    static get months(): string[] {
		if (DateSettings.culture == 'pt-BR') {
			return this.monthsPT;
		}
		else if (DateSettings.culture == 'en-US') {
			return this.monthsEN;
		}
	} 
    static get monthsAbrv(): string[] {
		if (DateSettings.culture == 'pt-BR') {
			return this.monthsPT.map(month => month.substring(0, 3));
		}
		else if (DateSettings.culture == 'en-US') {
			return this.monthsEN.map(month => month.substring(0, 3));
		}
	} 

	private static monthsPT = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	]

	private static monthsEN = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	static dayofweek(i: number) : string {
		return this.daysofweek[i];
	}
	static get daysofweek(): string[] {
		if (DateSettings.culture == 'pt-BR') {
			return [
				'domingo',
				'segunda',
				'terça',
				'quarta',
				'quita',
				'sexta',
				'sábado'
			]
		}
		else if (DateSettings.culture == 'en-US') {
			return [
				'sunday',
				'monday',
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday'
			]
		}
	}

	static days(month: number, year: number) {
		 
	}
	
    static dayOptions(year: number, month: number): DateModel[] {
		let daysOptions = [];
        let curr = this.firstSunday(new DateExtension(year, month));
		curr.setHours(0, 0, 0, 0);

        for(let x = 0; x < 42; x++) {
            daysOptions.push(new DateModel(curr.getFullYear(), curr.getMonth(), curr.getDate()))
            curr.addDays(1);
        }

		return daysOptions
    }

    private static firstSunday(currentView: DateExtension): DateExtension {
        if (currentView.getDay() == 0) {
            return currentView;
        }
        else {
            return this.firstSunday(currentView.addDays(-1));
        }
    }

	static get hours(): number[] {
		let result = [];
		for(let x = 0; x < 24; x++){
			result.push(x);
		}
		return result;
	}

	static get minutes(): number[] {
		let result = [];
		for(let x = 0; x < 60; x++){
			result.push(x);
		}
		return result;
	}
}

export class DateExtension extends Date {

    addDays(days: number): DateExtension {
        this.setDate(this.getDate() + days);
        return this;
    }
    
    addMonths(months: number): DateExtension {
        this.setMonth(this.getMonth() + months);
        return this;
    }
    
    addYears(years: number): DateExtension {
        this.setFullYear(this.getFullYear() + years);
        return this;
    }
    
    copy(): DateExtension {
        return new DateExtension(this.getTime());
    }
}

export class DateModel {
	dia: number;
	mes: number;
	ano: number;

	month: string;

	constructor(ano: number, mes: number = 1, dia: number = 1) {
		this.ano = ano;
		this.mes = mes;
		this.dia = dia;
		this.month = DateSettings.month(mes);
	}
}