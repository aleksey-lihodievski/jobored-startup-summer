import { APP_PREFIX } from '@modules/common/constants';

export const setToken = (key: string, token: string): void =>
	localStorage.setItem(`${APP_PREFIX}-${key}`, token);

export const getToken = (key: string) =>
	localStorage.getItem(`${APP_PREFIX}-${key}`);

export const clearToken = (key: string) =>
	localStorage.removeItem(`${APP_PREFIX}-${key}`);
