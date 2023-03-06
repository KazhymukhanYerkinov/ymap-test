const BASE_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

export const createApiLoader = (apiKey = ''): Promise<any> => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');

		script.type = 'text/javascript';
		script.onload = resolve;
		script.onerror = reject;
		script.src = `${BASE_URL}${apiKey ? `&apikey=${apiKey}` : ''}`;
		script.async = true;
		document.head.appendChild(script);
	});
};