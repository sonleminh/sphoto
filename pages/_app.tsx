import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor } from '../Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { MyAppProps, Page } from '@/page';
import { NextPage } from 'next';
import { Layouts } from '@/components/Layouts';

type Props = AppProps & {
  Component: Page;
  pageProps: any;
};
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // getLayout?: (page: ReactElement) => ReactNode;
  getLayout: any;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: any) => page);

  // const RenderWithLayout =
  //   Component.getLayout ||
  //   function (page: ReactNode) {
  //     return <Layout>{page}</Layout>;
  //   };
  // const Layout =
  //   Component.layout || ((children: ReactElement) => <>{children}</>);
  // const Layout = Component.getLayout ?? ((page: any) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ParallaxProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ParallaxProvider>
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
