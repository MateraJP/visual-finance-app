/**
 * Estrutura similar ao dicionário (chave/valor)
 */
export class KeyValueModel<T> {
    /**
     * Chave.
     */
    key = "";

    /**
     * Valor.
     */
    value!: T;

    constructor(init?: Partial<KeyValueModel<T>>) {
        Object.assign(this, init);
    }
}
