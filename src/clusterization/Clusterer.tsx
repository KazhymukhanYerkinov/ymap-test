import React from 'react';
import { AnyObject } from '../shared/types';
import { IClustererOptions } from 'yandex-maps';
import { useClusterer } from './useClusterer';

export interface ClustererProps extends AnyObject {

	options?: IClustererOptions;

	defaultOption?: IClustererOptions;

	children?: React.ReactNode;

}

const Clusterer: React.FC<ClustererProps> = (props) => {

	console.log('Clusterer');

	useClusterer({ ...props });

	return null;
};

Clusterer.displayName = 'Clusterer';

export default Clusterer;

