import React from 'react';

interface IHomeProps {}
interface IHomeState {}

class Home extends React.Component<IHomeProps, IHomeState> {
  public render() {
    return (
      <div>
        <img className="re-zero" alt="re-zero"/>
        <img className="re-zero" alt="re-zero"/>
      </div>
    );
  }
}

export default Home;

