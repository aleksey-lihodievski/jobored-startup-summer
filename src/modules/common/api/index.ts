import axios, {
	AxiosError,
	AxiosResponse,
	HttpStatusCode,
	InternalAxiosRequestConfig,
} from 'axios';

import {
	ACCESS_TOKEN_KEY,
	EXPIRE_DATE_KEY,
	REFRESH_TOKEN_KEY,
	VITE_JOBS_API_URL,
	VITE_X_SECRET_KEY,
} from '../constants';
import { clearToken, getToken } from '../services';

const SECRET_KEY = import.meta.env[VITE_X_SECRET_KEY];

const onRequest = async (
	config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
	const accessToken = getToken(ACCESS_TOKEN_KEY);

	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`;
		config.headers['X-Api-App-Id'] = SECRET_KEY;
	}

	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
	return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	if (error.response?.status === HttpStatusCode.Unauthorized) {
		clearToken(ACCESS_TOKEN_KEY);
		clearToken(REFRESH_TOKEN_KEY);
		clearToken(EXPIRE_DATE_KEY);
	}
	return Promise.reject(error);
};

export const getHttp = (baseURL: string) => {
	const http = axios.create({
		baseURL,
	});

	http.interceptors.request.use(onRequest, onRequestError);
	http.interceptors.response.use(onResponse, onResponseError);
	return http;
};

export const jobsApi = getHttp(import.meta.env[VITE_JOBS_API_URL]);
