import React from 'react';

interface IPage1Props {}
interface IPage1State {}

class Page1 extends React.Component<IPage1Props, IPage1State> {
  public render() {
    return (
      <div>
        <h1 onClick={ () => $('img').hide() }> Page 1</h1>
        <img id="re-zero-1" alt="re-zero" />
        <img id="re-zero-1" alt="re-zero" />
      </div>
    );
  };
}

export default Page1;
