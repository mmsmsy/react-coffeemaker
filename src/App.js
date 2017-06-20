import React, { Component } from 'react';
import MakeCoffee from './Components/MakeCoffee';
import CoffeeLog from './Components/CoffeeLog';
import uuid from 'uuid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coffees: []
    }
  }

  getCoffeesMade = () => {
    this.setState({coffees: [
      {
        id: uuid.v4(),
        author: 'Annwumy',
        kind: 'Cappuccino',
        sugar: false,
        milk: false,
        size: 'Medium',
        comment: '<Me> time with capuccino.'
      },
      {
        id: uuid.v4(),
        author: 'mmsmsy',
        kind: 'Americano',
        sugar: false,
        milk: false,
        size: 'Small',
        comment: 'Simple.'
      },
      {
        id: uuid.v4(),
        author: 'Sugar Crush',
        kind: 'Macchiato',
        sugar: true,
        milk: false,
        size: 'Medium',
        comment: "Can't stand the taste of coffee."
      },
      {
        id: uuid.v4(),
        author: 'The Big Gulp',
        kind: 'Frappe',
        sugar: true,
        milk: true,
        size: 'Large',
        comment: "I'm all for healthy lifestyle, though. Just not now."
      }
    ]});
  }

  componentDidMount() {
    this.getCoffeesMade();
  }

  handleDeleteCoffee = (id) => {
    let coffees = this.state.coffees;
    let index = coffees.findIndex(x => x.id === id);
    coffees.splice(index, 1);
    this.setState({coffees: coffees});
  }

  handleMakeCoffee = (coffee) => {
    let coffees = this.state.coffees;
    coffees.push(coffee);
    this.setState({coffees: coffees});
  }

  render() {
    return (
      <div className='coffee-machine'>
        <MakeCoffee makeCoffee={this.handleMakeCoffee} />
        <hr />
        <CoffeeLog coffees={this.state.coffees} deleteCoffee={this.handleDeleteCoffee} />
      </div>
    );
  }
}

export default App;
