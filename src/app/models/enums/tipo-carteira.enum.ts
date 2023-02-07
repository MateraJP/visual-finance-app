import { KeyValueModel } from "../key-value.model";

export enum TipoCarteiraEnum {
	ContaCorrente = 'ContaCorrente',
	ContaPoupanca = 'ContaPoupanca',
	ContaInvestimento = 'ContaInvestimento',
	CartaoCredito = 'CartaoCredito'
}

export class TipoCarteira {
	static getDescription(enumValue: string): string {
		switch (enumValue) {
			case TipoCarteiraEnum.ContaCorrente:
				return 'Conta Corrente';
			case TipoCarteiraEnum.ContaPoupanca:
				return 'Conta Poupança';
			case TipoCarteiraEnum.ContaInvestimento:
				return 'Conta de Investimentos';
			case TipoCarteiraEnum.CartaoCredito:
				return 'Cartão de Crédito';
			default:
				return '';
		}
	}

	static getIcon(enumValue: string): string {
		switch (enumValue) {
			case TipoCarteiraEnum.ContaCorrente:
				return 'fas fa-money-check-alt';
			case TipoCarteiraEnum.ContaPoupanca:
				return 'fas fa-piggy-bank';
			case TipoCarteiraEnum.ContaInvestimento:
				return 'fas fa-chart-line';
			case TipoCarteiraEnum.CartaoCredito:
				return 'fas fa-credit-card';
			default:
				return '';
		}
	}

	static getList(): any[] {
		const result: any[] = [];
		let id = 1;
		Object.keys(TipoCarteiraEnum).forEach(key => {
			result.push({
				id: 10*id++,
				key,
				value: TipoCarteira.getDescription(key),
				icon: TipoCarteira.getIcon(key)
			});
		});

		return result;
	}
}