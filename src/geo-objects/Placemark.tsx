import React from 'react';
import { AnyObject } from '../shared/types';
import { IGeometry, IDataManager, IPlacemarkOptions } from 'yandex-maps';


export interface PlacemarkProps extends AnyObject {

	geometry?: IGeometry[][][] | number[][] | object;

	defaultGeometry?: IGeometry[][][] | number[] | object;

	properties?: AnyObject | IDataManager;

	defaultProperties?: AnyObject | IDataManager;

	options?: IPlacemarkOptions;

	defaultOptions?: IPlacemarkOptions;

}

const Placemark: React.FC<PlacemarkProps> = () => null;

Placemark.displayName = 'Placemark';

export default Placemark;