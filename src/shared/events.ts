const EVENTS_REGEX = /^on(?=[A-Z])/;

// --- Separates YMaps events from other component props based on prop name --- //
export function separateEvents(props: any): any {
	return Object.keys(props).reduce(
		(acc: any, key: string): any=> {
			if (EVENTS_REGEX.test(key)) {
				const eventName = key.replace(EVENTS_REGEX, '').toLowerCase();
				acc._events[eventName] = props[key];
			} else {
				acc[key] = props[key];
			}

			return acc;
		},
		{ _events: {} }
		
	);
}

// --------- Add event to YMaps object --------- //
export function addEvent(instance: any, eventName: string, handler: any): void {
	if (typeof handler === 'function') {
		instance.events.add(eventName, handler);
	}
}