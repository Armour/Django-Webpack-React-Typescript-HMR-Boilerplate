import React from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';

import FAB from 'components/FAB';

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
  }
}

export default Layout;
