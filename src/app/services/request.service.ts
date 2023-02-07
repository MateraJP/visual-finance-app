import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ContentTypeEnum, RequestModel, UrlParameterModel } from "../models/request.model";
import { DictionaryType } from "../models/dictionary.type";

@Injectable({
	providedIn: "root"
})
export class RequestService {
	baseUrl = environment.baseUrl;
	
	constructor(private http: HttpClient) { }
		
	/**
     * Cria uma requisição HTTP do tipo GET.
     * @param config Dados de configuração da requisição.
     */
    makeGet<T>(config = new RequestModel()): Observable<T> {
        return this.makeRequest<T>(
            "get",
            config.isAbsolute ? config.url : this.getUrl(config.url, this.baseUrl, config.isBase, config.id),
            config.headers,
            undefined,
            this.getParams(config.params),
            config.contentType,
            config.responseType
        );
    }

    /**
     * Cria uma requisição HTTP do tipo POST.
     * @param config Dados de configuração da requisição.
     */
    makePost<T>(config = new RequestModel()): Observable<T> {
        return this.makeRequest<T>(
            "post",
            config.isAbsolute ? config.url : this.getUrl(config.url, this.baseUrl, config.isBase, config.id),
            config.headers,
            config.data,
            undefined,
            config.contentType,
            config.responseType
        );
    }

    /**
     * Cria uma requisição HTTP do tipo PUT.
     * @param config Dados de configuração da requisição.
     */
    makePut<T>(config = new RequestModel()): Observable<T> {
        return this.makeRequest<T>(
            "put",
            config.isAbsolute ? config.url : this.getUrl(config.url, this.baseUrl, config.isBase, config.id),
            config.headers,
            config.data
        );
    }

    /**
     * Cria uma requisição HTTP do tipo DELETE.
     * @param config Dados de configuração da requisição.
     */
    makeDelete(config = new RequestModel()): Observable<boolean> {
        return this.makeRequest<boolean>(
            "delete",
            config.isAbsolute ? config.url : this.getUrl(config.url, this.baseUrl, config.isBase, config.id),
            config.headers
        );
    }

    /**
     * Cria uma requisição HTTP do tipo POST com arquivo.
     * @param config Dados de configuração da requisição.
     */
    makeFilePost<T>(config = new RequestModel()): Observable<T> {
        return this.makeRequest<T>(
            "post",
            config.isAbsolute ? config.url : this.getUrl(config.url, this.baseUrl, config.isBase, config.id),
            config.headers,
            config.data,
            undefined,
            config.contentType
        );
    }

    /**
     * Cria uma requisição HTTP.
     * @param type Tipo da requisição.
     * @param url URL
     * @param [data] Corpo do request (body).
     * @param [contentType] Tipo do conteúdo do corpo.
     * @param [httpParams] Parâmetros de URL.
     */
    private makeRequest<T>(
        type: "get" | "post" | "put" | "delete",
        url: string,
        headers?: DictionaryType<string>,
        data?: any,
        httpParams: HttpParams = new HttpParams(),
        contentType: ContentTypeEnum = ContentTypeEnum.ApplicationJson,
        responseType?: ContentTypeEnum
    ): Observable<T> {
        let request: Observable<T>;
        let httpHeaders = new HttpHeaders();

        if (contentType !== ContentTypeEnum.Empty)
            httpHeaders = httpHeaders.append("Content-Type", contentType);

        if (headers)
            Object.entries(headers).forEach(([key, value]) => {
                if (value) httpHeaders = httpHeaders.append(key, value);
            });

        const httpOptions: {
            headers: HttpHeaders;
            params: HttpParams;
            responseType?: any;
        } = {
            headers: httpHeaders,
            params: httpParams,
            responseType: undefined,
        };

        if (responseType) httpOptions.responseType = responseType;

        if (contentType === ContentTypeEnum.Empty)
            request = this.http.post<T>(url, data, httpOptions);
        else if (contentType === ContentTypeEnum.ApplicationFormEncoded)
            request = this.http.post<T>(url, String(data), httpOptions);
        else {
            const bodyString = data ? JSON.stringify(data) : "";

            switch (type) {
                case "get":
                    request = this.http.get<T>(url, httpOptions);
                    break;
                case "post":
                    request = this.http.post<T>(url, bodyString, httpOptions);
                    break;
                case "put":
                    request = this.http.put<T>(url, bodyString, httpOptions);
                    break;
                case "delete":
                    request = this.http.delete<T>(url, httpOptions);
                    break;
            }
        }

        return request;
    }

    /**
     * Gera um objeto HttpParams com base nos parâmetros de URL informados.
     * @param params Parâmetros de URL.
     */
    private getParams(params: UrlParameterModel[]): HttpParams {
        let httpParams = new HttpParams();

        for (const param of params)
            httpParams = httpParams.set(param.key, param.value);

        return httpParams;
    }

	private getUrl(
        url: string,
        baseUrl: string,
        isBase = false,
        id?: string
    ): string {
        const currentUrl: string =
            this.trimTrailingSlash(baseUrl) +
            (isBase ? "" : "/api") +
            `/${this.trimLeadingAndTrailingSlash(url)}`;
        return id ? `${currentUrl}/${id}` : currentUrl;
    }

    /**
     * Remove a última barra (/) da URL, se houver.
     * @param url URL a ser tratada.
     */
    private trimTrailingSlash(url: string): string {
        return url.replace(new RegExp("/$"), "");
    }

    /**
     * Remove a primeira e última barra (/) da URL, se houver.
     * @param url URL a ser tratada.
     */
    private trimLeadingAndTrailingSlash(url: string): string {
        return url.replace(new RegExp("^/|/$", "g"), "");
    }

}