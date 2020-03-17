import React from 'react';
import { Layout } from '../components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store';

const AppLayout = ({ Component, pageProps }) => {
	
	return (
		<Provider store={store}>
			<PersistGate loading={null}  persistor={persistor} >
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</Provider>
	);
};
export default AppLayout;
