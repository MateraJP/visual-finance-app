import { Subject } from "rxjs";
// import { OptionalType } from '../types/optional.type';
// import { StorageTypeEnum } from "./storage-type.enum";
// import { TableEnum } from "./tables.enum";

export class BaseStorage {
    onSave = new Subject<any>();
    onRemove = new Subject<string[]>();

    protected separator = '.';
    protected storage: Storage;

    private table: 'security' | 'preferences' | 'tst';
    //'gridSearch' : 'gridView' : 'notifications' ;
    constructor(table: 'security' | 'preferences') {
        this.table = table;

        this.setup();
    } /**

    /**
     * Verifica se o navegador tem suporte ao armazenamento selecionado.
     */
    isBrowserSupported(): boolean {
        return !!this.storage;
    }

    /**
     * Salva um registro usando a chave informada.
     * @param data Dados a serem salvos.
     * @param key Chave do item no banco de dados local.
     */
    save<T>(key: string, data: T): void {
        if (this.storage) {
            const savedData: string = !data ? undefined : JSON.stringify(data);

            this.storage.setItem(this.getKey(key), savedData);
            this.onSave.next(data);
        }
    }

    /**
     * Obtém um registro usando a chave informada.
     * @param key Chave do item no banco de dados local.
     */
    get<T>(key: string): T {
        if (this.storage) {
            const item = this.storage.getItem(this.getKey(key));

            if (!item || item === 'null') {
                return undefined;
            }

            try {
                return <T>JSON.parse(item);
            } catch {
            }
        }
        return undefined;
    }

    /**
     * Obtém todos os registros.
     */
    getAllItems<T>(): T[] {
        const values: T[] = [];
        const keys = this.getKeys();
        let i = keys.length;

        while (i--) {
            values.push(this.get(keys[i]));
        }

        return values;
    }

    /**
     * Remove o(s) item(ns) informado(s).
     * @param keys Chaves dos itens a serem removidos.
     */
    remove(...keys: string[]): void {
        if (this.storage) {

            keys.forEach((key: string) => {
                try {
                    this.storage.removeItem(key);
                } catch (e) { }
            });

            this.onRemove.next(keys);
        }
    }

    /**
     * Apaga os dados da tabela local.
     */
    clear(): void {
        const existingKeys = this.getKeys();
        for (const key of Object.keys(this.storage)) {
            const currentKey = existingKeys.find(k => k === key);

            if (currentKey) {
                this.remove(currentKey);
            }
        }
    }

    /**
     * Obtém todas as chaves no banco de dados local.
     */
    getKeys(): Array<string> {
        if (this.storage) {
            const prefix = this.getPrefix();
            const prefixLength = prefix.length;
            const keys: Array<string> = [];

            for (const key of Object.keys(this.storage)) {
                if (key.substring(0, prefixLength) === prefix) {
                    keys.push(key);
                }
            }

            return keys;
        }
        return [];
    }


    private setup(): void {
        try {
            const isSupported = !!('localStorage' in window && window['localStorage']);
            const previousTable = this.table;
            this.table = 'tst';

            if (isSupported) {
                this.storage = window['localStorage'];

                const key = this.getKey(`__${Math.round(Math.random() * 1e7)}`);

                this.storage.setItem(key, '');
                this.storage.removeItem(key);
            }

            this.table = previousTable;
        } catch (e) {
            // Quando o Safari (OS X ou iOS) está em modo privado, parece que localStorage está disponível, mas
            // quando se tenta executar .setItem uma exceção será gerada:
            // ("QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota.")
            // Corrigido a partir do Safari 11
            this.storage = undefined;
        }
    }

    private getKey(key: string): string {
        return `${this.getPrefix()}${key}`;
    }

    private getPrefix(): string {
        return `${this.table.length > 0 ? this.table + this.separator : ''}`;
    }
}