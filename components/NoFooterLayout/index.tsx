import React, { PropsWithChildren } from 'react';
import Header from '../Header';

// type LayoutProps = {
//   children: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement
// };

const NoFooterLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div>{props.children}</div>
    </>
  );
};

export default NoFooterLayout;
