import React from 'react';
import YMap from './YMap';
import { YMapsProvider } from './context/ymap.context';
import { Placemark } from './geo-objects';
import Clusterer from './clusterization/Clusterer';


const API_KEY = 'dcdfda7f-83e6-47f7-a5a2-1827cbbd3cc6';

function App() {

	const placemark = React.useRef<any>();
	const [center, setCenter] = React.useState<any>(null);
	const [zoom, setZoom] = React.useState<any>(7);

	const toggleClicked = (e: any) => {

		console.log('Console event: ', e);
		console.log('Console get target: ', e.get('target'));
		console.log('Console get target geometry: ', e.get('target').geometry._coordinates);

		setCenter(e.get('target').geometry._coordinates);


		placemark.current = e.get('target');

		e.get('target').options.set('preset', 'islands#pinkDotIcon');

	};

	const replace = () => {
		placemark.current.options.set('preset', 'islands#greenDotIcon');
	}

	const onObjects = (geoObjects: any[]) => {

		console.log(geoObjects);

	}


	return (
		<div>
			<YMapsProvider>
				<YMap
					apiKey={API_KEY}
					width='100%' height='100vh'
					state={{ zoom, center }}
					defaultState={{ zoom: 7, center: [42.315514, 69.586916], controls: ['geolocationControl'] }}>


					<Placemark
						onClick={toggleClicked}
						geometry={[42.315514, 69.586916]}
						options={{ preset: 'islands#greenDotIcon' }}
						properties={{ data: 'KAZHYMUKHAN' }} />

					<Placemark
						onClick={toggleClicked}
						geometry={[42.315514, 69.586916]}
						options={{ preset: 'islands#greenDotIcon', draggable: true }}
						properties={{ name: 'KAZHYMUKHAN', surname: 'YERKINOV' }} />

					<Clusterer onClick={(e: any) => { console.log(e) }}>
						<Placemark
							onClick={toggleClicked}
							geometry={[43.315514, 69.586916]}
							options={{ preset: 'islands#greenDotIcon' }}
							properties={{ data: 'KAZHYMUKHAN' }} />

						<Placemark
							onClick={toggleClicked}
							geometry={[43.315514, 69.586916]}
							options={{ preset: 'islands#greenDotIcon', draggable: true }}
							properties={{ name: 'KAZHYMUKHAN', surname: 'YERKINOV' }} />
					</Clusterer>


				</YMap>
			</YMapsProvider>

			<button onClick={() => setZoom((prev: any) => prev + 1)}> replace </button>
		</div>

	);
}


export default App;
