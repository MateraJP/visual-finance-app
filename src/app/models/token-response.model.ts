/**
 * Representa um token de resposta da autenticação.
 */
export class TokenResponseModel {
    /**
     * Token de acesso.
     */
    access_token = "";

    /**
     * Tipo do token.
     */
    token_type = "";

    /**
     * Validade do token em milissegundos.
     */
    expires_in = 0;

    /**
     * Data de validado do token.
     */
    valid_until!: Date;

    /**
     * Erro.
     */
    error = "";

    /**
     * Descrição do erro.
     */
    error_description = "";

    /**
     * Novas propriedades para autenticar via uniotoken
     */
    accessToken = "";
    created!: Date;
    expiration!: Date;
}
