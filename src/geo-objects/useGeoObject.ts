import React from 'react';
import { LoadingStatus, GeoObjectKeys } from '../shared/types';
import { YMapContext } from '../context/ymap.context';
import { addEvent, separateEvents } from '../shared/events';
import { getProp } from '../shared/props';


export interface UseGeoObjectProps {
	children: React.ReactNode;
}

export interface IUseGeoObject {
	renderComponents: any[];
}

export const useGeoObject = ({ children }: UseGeoObjectProps): IUseGeoObject => {
	const { ymap, ymapLoad } = React.useContext(YMapContext);
	const [renderComponents, setRenderComponents] = React.useState<any[]>([]);


	const filterChildren = React.useCallback((child: JSX.Element) => {

		const { props, type } = child;

		// --- Get geoObject events
		const { _events } = separateEvents(props);

		// --- Get geoObject props
		const options = getProp(props, 'options');
		const geometry = getProp(props, 'geometry');
		const properties = getProp(props, 'properties');

		// --- Create Placemark --- //
		if (type.displayName === GeoObjectKeys.PLACEMARK) {
			addPlacemark(options, geometry, properties, _events);
		} else {
			setRenderComponents((components) => [...components, child]);
		}
	}, []);

	const addPlacemark = (o: any, g: any, p: any, e: any): any => {
		// @ts-ignore
		const pm = new ymaps.Placemark(g, p, o);
		Object.keys(e).forEach(key => addEvent(pm, key, e[key]));
		ymap.current?.geoObjects.add(pm);
	};



	React.useEffect(() => {

		if (ymapLoad === LoadingStatus.SUCCESS) {
			React.Children.toArray(children).map((child) => {
				if (React.isValidElement(child)) { filterChildren(child); }
			});
		}

	}, [ymapLoad]);


	return { renderComponents };
};