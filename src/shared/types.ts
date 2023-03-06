export interface AnyObject {
	[key: string]: any;
}

export enum LoadingStatus {
	ERROR = 'ERROR',
	NEVER = 'NEVER',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
}

export enum GeoObjectKeys {
	PLACEMARK = 'Placemark'
}