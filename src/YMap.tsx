import React from 'react';
import { useYMap, UseYMapProps } from './hooks/useYandexMap';
import { useGeoObject } from './geo-objects/useGeoObject';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, ID } from './shared/const';


interface YMapProps extends UseYMapProps {

	width?: string | number;

	height?: string | number;

	children?: React.ReactNode;

}


const YMap: React.FC<YMapProps> = (props) => {

	const { children, width, height, ...otherProps } = props;

	useYMap({ ...otherProps });

	const { renderComponents } = useGeoObject({ children });

	console.log({ renderComponents });

	return (
		<React.Fragment>
			<div id={ID} style={{ width: width || DEFAULT_WIDTH, height: height || DEFAULT_HEIGHT }} />
			{renderComponents}
		</React.Fragment>
	);

};

export default YMap;