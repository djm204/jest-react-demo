import React, { Component } from 'react';
import logo from './img/kitty.png';
import kittyImg from './img/garfield.png';
import { Kitty, AddKittyActions } from './components/Kitty';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.addAKitty = this.addAKitty.bind(this);
    this.removeAKitty = this.removeAKitty.bind(this);

    this.state = {
      kitties: 0
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Add Kittehs</h1>
          <AddKittyActions AddKitty={this.addAKitty} RemoveKitty={this.removeAKitty}/>
        </header>
        <div className="addKittiesForm">
          {this.renderKitties()}
        </div>
      </div>
    );
  }

  renderKitties() {
    const { kitties } = this.state;
    let kittens =  [];
    for(var i = 0; i < kitties; i ++) {
      kittens.push(<Kitty key={Math.random(100)} kittyImg={kittyImg} />)
    }

    return kittens;
  }

  addAKitty() {
    const { kitties } = this.state;
    this.setState({kitties: kitties +1});
  }

  removeAKitty() {
    const { kitties } = this.state;
    this.setState({kitties: kitties -1});
  }
}

export default App;
