export interface RefreshTokenResponse {
	access_token: string;
	refresh_token: string;
	ttl: number;

	/*** In miliseconds **/
	expires_in: number;
	token_type: string;
}
