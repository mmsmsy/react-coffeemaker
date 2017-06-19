import React, { Component } from 'react';
import MakeCoffee from './Components/MakeCoffee';
import CoffeeLog from './Components/CoffeeLog';
import uuid from 'uuid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coffees: [
        {
          id: uuid.v4(),
          author: 'Annwumy',
          coffeeType: 'Capuccino',
          sugar: true,
          milk: true,
          comment: '<Me> time with capuccino'
        }
      ]
    }
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
        <CoffeeLog coffees={this.state.coffees} deleteCoffee={this.handleDeleteCoffee} />
      </div>
    );
  }
}

export default App;
