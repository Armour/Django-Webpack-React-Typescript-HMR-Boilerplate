import React from 'react';

interface IPage1Props {}
interface IPage1State {}

class Page1 extends React.Component<IPage1Props, IPage1State> {
  public hideH1 = () => $('h1').hide();

  public render() {
    return (
      <div>
        <h1 onClick={this.hideH1}> Page 1</h1>
      </div>
    );
  }
}

export default Page1;
