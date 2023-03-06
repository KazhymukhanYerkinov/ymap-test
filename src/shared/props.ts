
const defaultName = (name: string): string => 'default' + name.charAt(0).toUpperCase() + name.slice(1);


// --- Checks if key exists on an object
export function isControlledProp(props: any, key: string): any {
	return props[key] !== undefined || props[defaultName(key)] === undefined;
 }


/**  
 * Checks if prop exists, otherwise returns "uncontrolled" 
 * prop that starts with default (e.g., defaultValue) 
 */
export function getProp(props: any, key: string, defaultValue?: any): any {
	return (
		(isControlledProp(props, key) ? props[key] : props[defaultName(key)]) ||
		defaultValue
	);
}