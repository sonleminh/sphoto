import { NextComponentType, NextPage, NextPageContext } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { LayoutKeys } from './components/Layouts';
import { AppProps } from 'next/app';

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};

export type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};
