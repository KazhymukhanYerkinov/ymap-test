import React from 'react';

// --- JS
import { getProp } from '../shared/props';
import { DEFAULT_CLUSTER } from '../shared/const';
import { YMapContext } from '../context/ymap.context';
import { addEvent, separateEvents } from '../shared/events';

// --- TYPES
import { ClustererProps } from './Clusterer';
import { LoadingStatus, GeoObjectKeys } from '../shared/types';


export const useClusterer = (props: ClustererProps): void => {

	const { defaultOption, children } = props;

	const { ymap, ymapLoad } = React.useContext(YMapContext);



	const createClusterer = (): any => {
		const { _events } = separateEvents(props);

		// @ts-ignore
		const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(DEFAULT_CLUSTER);
		// @ts-ignore
		const clusterer = new ymaps.Clusterer({
			// @ts-ignore
			clusterIcons: [{
				size: [40, 40],
				offset: [-20, -20],
			}],
			clusterIconContentLayout: MyIconContentLayout,
		});


		Object.keys(_events).forEach(key => addEvent(clusterer, key, _events[key]));

		return clusterer;
	};

	const creatorGeoObject = React.useCallback(( props: any, type: React.FC ) => {

		// --- Get geoObject events
		const { _events } = separateEvents(props);

		// --- Get geoObject props
		const options = getProp(props, 'options');
		const geometry = getProp(props, 'geometry');
		const properties = getProp(props, 'properties');

		// --- Create Placemark --- //
		if (type.displayName === GeoObjectKeys.PLACEMARK) {
			return returnedPlacemark(options, geometry, properties, _events);
		}

	}, []);

	const returnedPlacemark = (o: any, g: any, p: any, e: any): any => {
		// @ts-ignore
		const pm = new ymaps.Placemark(g, p, o);
		Object.keys(e).forEach(key => addEvent(pm, key, e[key]));
		return pm;
	};






	React.useEffect(() => {
		if (ymapLoad === LoadingStatus.SUCCESS) {

			const geo_objects = [] as any;

			const clusterer = createClusterer();

			React.Children.toArray(children).map((child) => {
				if (React.isValidElement(child)) {
					geo_objects.push(creatorGeoObject(child.props, child.type as React.FC));
				}
			});

			clusterer.add(geo_objects);
			ymap.current.geoObjects.add(clusterer);
		}
	}, [ymapLoad]);

};