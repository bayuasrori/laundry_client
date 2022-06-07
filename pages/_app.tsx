import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import RefreshTokenHandler from '../components/refreshTokenHandler';

function MyApp({ Component, pageProps }: AppProps) {
    const [interval, setInterval] = useState(0);

    return (
        <SessionProvider session={pageProps.session} refetchInterval={interval}>
            <Component {...pageProps} />
            <RefreshTokenHandler setInterval={setInterval} />
        </SessionProvider>
    )
}

export default MyApp;