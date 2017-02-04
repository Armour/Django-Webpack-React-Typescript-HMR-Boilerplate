import React from 'react';
import { Link } from 'react-router';

interface ICustomProps {}
interface ICustomState {}

class Custom extends React.Component<ICustomProps, ICustomState> {
  public render() {
    return (
      <div>
        <h3><Link to="/page1"> Page 1 </Link></h3>
        <h3><Link to="/page2"> Page 2 </Link></h3>
        <img className="re-zero" id="re-zero-1" alt="re-zero" />
        <img className="re-zero" id="re-zero-2" alt="re-zero" />
      </div>
    );
  }
}

export default Custom;
