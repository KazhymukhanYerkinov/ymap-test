import { GEO_OBJECTS } from "./const";

export const isGeoObject = (type: React.FC): boolean => {
	const name = type.displayName || 'unknown';
	return GEO_OBJECTS.includes(name);
};