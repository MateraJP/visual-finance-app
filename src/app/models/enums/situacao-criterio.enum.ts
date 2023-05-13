import { KeyValueModel } from "../key-value.model";

export enum SituacaoCriterioEnum {
	Ativo = 'Ativo',
	Inativo = 'Inativo',
	EmElaboracao = 'EmElaboracao'
}

export class SituacaoCriterio {
	static getDescription(enumValue: string): string {
		switch (enumValue) {
			case SituacaoCriterioEnum.Ativo:
				return 'Ativo';
			case SituacaoCriterioEnum.Inativo:
				return 'Oculto';
			case SituacaoCriterioEnum.EmElaboracao:
				return 'Em Elaboração';
			default:
				return '';
		}
	}

	static getStyle(enumValue: string): string {
		switch (enumValue) {
			case SituacaoCriterioEnum.Ativo:
				return '-success';
			case SituacaoCriterioEnum.Inativo:
				return '-danger';
			case SituacaoCriterioEnum.EmElaboracao:
				return '-info';
		}
	}

	static getList(): KeyValueModel<string>[] {
		const result: KeyValueModel<string>[] = [];

		Object.keys(SituacaoCriterioEnum).forEach(key => {
			result.push(new KeyValueModel({
				key,
				value: SituacaoCriterio.getDescription(key)
			}));
		});

		return result;
	}
}