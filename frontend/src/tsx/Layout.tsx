import React from 'react';

import Footer from 'tsx/Footer';
import Header from 'tsx/Header';

import FAB from 'tsx/FAB';

interface ILayoutProps {}
interface ILayoutState {}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  public render() {
    return (
        <div>
          <Header />
          {this.props.children}
          <FAB/>
          <Footer/>
        </div>
    );
  };
}

export default Layout;
