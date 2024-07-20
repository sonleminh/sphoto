import React, { PropsWithChildren } from 'react';
import Header from '../Header';

const NoFooterLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div>{props.children}</div>
    </>
  );
};

export default NoFooterLayout;
