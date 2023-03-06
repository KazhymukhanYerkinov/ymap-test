import React from 'react';

// --- JS
import { YMapContext } from '../context/ymap.context';
import { createApiLoader } from '../shared/create-api-loader';
import { ID, DEFAULT_ZOOM, DEFAULT_CENTER, GEO_LOCATION } from '../shared/const';

// --- TYPES
import { IMapState } from 'yandex-maps';
import { LoadingStatus } from '../shared/types';

// --- ASSETS
import geolocation from '../geolocation.png';


export interface UseYMapProps {
	apiKey?: string;
	cityName?: string;
	state?: IMapState;
	defaultState?: IMapState;
	onChangeZoom?: (zoom: number) => void;
}

export const useYMap = ({ apiKey, state, defaultState, onChangeZoom, cityName }: UseYMapProps): void => {
	const { ymap, setYmapLoad } = React.useContext(YMapContext);

	const ZOOM = defaultState?.zoom || DEFAULT_ZOOM;
	const CENTER = defaultState?.center || DEFAULT_CENTER;

	
	const initialMap = async (): Promise<void> => {
		try {
			setYmapLoad && setYmapLoad(LoadingStatus.LOADING);
			await createApiLoader(apiKey);
			// @ts-ignore
			await ymaps.ready(loadYMap);
		} catch (e) {
			setYmapLoad && setYmapLoad(LoadingStatus.ERROR);
		}
	};

	const loadYMap = (): void => {

		const controls = filterControls();
		// @ts-ignore
		ymap.current = new ymaps.Map(ID, {
			...defaultState, zoom: ZOOM, center: CENTER, controls
		});

		ymap.current.events.add('boundschange', handlerBoundsChange);

		getGeocode();
		setYmapLoad && setYmapLoad(LoadingStatus.SUCCESS);
	};


	const handlerBoundsChange = (e: any): void => {
		if (e.get('newZoom') !== e.get('oldZoom')) {
			onChangeZoom && onChangeZoom(e.get('newZoom'));
		}
	};

	const getGeocode = (): void => {
		if (cityName && cityName.trim()) {
		// @ts-ignore
			ymaps.geocode(cityName).then((response) => {
				// @ts-ignore
				const position = response?.geoObjects?.get(0)?.geometry?._coordinates;
				ymap?.current?.setCenter(position);
			});
		}
	};


	const createGeoLocation = (): any => {
		// @ts-ignore
		const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(GEO_LOCATION);

		// @ts-ignore
		const geoControl = new ymaps.control.GeolocationControl({
			// @ts-ignore
			options: { noPlacemark: true, layout: MyIconContentLayout, position: { bottom: 50, right: 5 }, float: 'none' }
		});

		geoControl.events.add('locationchange', function (event) {
			
			const position = event.get('position');
			// @ts-ignore
			const geoPlacemark = new ymaps.Placemark(position, {}, {
				iconImageHref: geolocation,
				iconLayout: 'default#image',
				iconImageSize: [44, 44],
				iconImageOffset: [-22, -22],
			});

			ymap.current?.geoObjects.add(geoPlacemark);
			ymap.current?.panTo(position);
		});

		return geoControl;
	};

	const filterControls = (): any => {
		const geoControl = createGeoLocation();

		// --- Filter controls
		const controls = [];

		for (const control of (defaultState?.controls || [])) {
			if (control === 'geolocationControl') {
				controls.push(geoControl);
			} else {
				controls.push(control);
			}
		}

		return controls;
	};





	React.useEffect(() => {
		initialMap();
		return () => { ymap.current?.destroy(); };
	}, []);


	React.useEffect(() => {
		ymap?.current?.setZoom(state?.zoom || ZOOM, { duration: 300 });
	}, [state?.zoom]);


	React.useEffect(() => {
		ymap?.current?.setCenter(state?.center || CENTER, state?.zoom, { duration: 300 });
	}, [state?.center]);
	
};