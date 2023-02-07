import { KeyValueModel } from "../key-value.model";

export enum SituacaoCarteiraEnum {
	Ativo = 'Ativo',
	Inativo = 'Inativo',
	EmElaboracao = 'EmElaboracao'
}

export class SituacaoCarteira {
	static getDescription(enumValue: string): string {
		switch (enumValue) {
			case SituacaoCarteiraEnum.Ativo:
				return 'Ativo';
			case SituacaoCarteiraEnum.Inativo:
				return 'Bloqueado';
			case SituacaoCarteiraEnum.EmElaboracao:
				return 'Em Elaboração';
			default:
				return '';
		}
	}

	static getStyle(enumValue: string): string {
		switch (enumValue) {
			case SituacaoCarteiraEnum.Ativo:
				return '-success';
			case SituacaoCarteiraEnum.Inativo:
				return '-danger';
			case SituacaoCarteiraEnum.EmElaboracao:
				return '-info';
		}
	}

	static getList(): KeyValueModel<string>[] {
		const result: KeyValueModel<string>[] = [];

		Object.keys(SituacaoCarteiraEnum).forEach(key => {
			result.push(new KeyValueModel({
				key,
				value: SituacaoCarteira.getDescription(key)
			}));
		});

		return result;
	}
}