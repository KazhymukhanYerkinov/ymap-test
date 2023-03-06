import React from 'react';
import { LoadingStatus } from '../shared/types';

export interface IYMapContext {
	ymap?: any;
	ymapLoad?: LoadingStatus;
	setYmapLoad?: (ymapLoad: LoadingStatus) => void;
}

export const YMapContext = React.createContext<IYMapContext>({});

export const YMapsProvider = ({ children }: React.PropsWithChildren<IYMapContext>): JSX.Element => {

	const ymap = React.useRef<any>();
	const [ymapLoad, setYmapLoad] = React.useState(LoadingStatus.NEVER);

	return (
		<YMapContext.Provider value={{ ymap, ymapLoad, setYmapLoad }}>
			{children}
		</YMapContext.Provider>
	);
};