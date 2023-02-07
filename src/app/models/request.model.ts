import { DictionaryType } from "./dictionary.type";

export class RequestModel<T> {
    /**
     * URL.
     */
    url!: string;
    /**
     * ID do registro, se houver.
     */
    id?: string;
    /**
     * Objeto a ser enviado no corpo (body).
     */
    data?: T;
    /**
     * Indica se é uma URL base (se deve ignorar o "/api/").
     */
    isBase = false;
    /**
     * Indica se a url informada é absoluta.
     */
    isAbsolute = false;
    /**
     * Tipo do conteúdo sendo enviado.
     */
    contentType = ContentTypeEnum.ApplicationJson;
    /**
     * Tipo do conteúdo a ser recebido.
     */
    responseType?: ContentTypeEnum;
    /**
     * Parâmetros de URL, se houverem.
     */
    params: UrlParameterModel[] = [];
    /**
     * Cabeçalhos.
     */
    headers?: DictionaryType<string>;

	constructor(init?: Partial<RequestModel<T>>) {
        Object.assign(this, init);
	}
}

/**
 * Represents an URL parameter
 */
export class UrlParameterModel {
    constructor(
        /**
         * Chave.
         */
        public key: string,

        /**
         * Valor.
         */
        public value: string
    ) { }
}

/**
 * Tipos de conteúdo das requisições HTTP.
 */
export enum ContentTypeEnum {
    /**
     * Vazio.
     */
    Empty = "",
    /**
     * application/json.
     */
    ApplicationJson = "application/json",
    /**
     * image/jpeg.
     */
    ImageJpeg = "image/jpeg",
    /**
     * image/png.
     */
    ImagePng = "image/png",
    /**
     * application/xml.
     */
    ApplicationXml = "application/xml",
    /**
     * application/x-www-form-urlencoded
     */
    ApplicationFormEncoded = "application/x-www-form-urlencoded",
    /**
     * text/csv
     */
    TextCsv = "text/csv",
    /**
     * blob
     */
    Blob = "blob",
    /**
     * arraybuffer
     */
    ArrayBuffer = "arraybuffer",
}