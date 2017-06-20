import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CoffeeLog extends Component {
  deleteItself = (id) => {
    this.props.deleteCoffee(id);
  }

  render() {
    let coffeeLogItems;
    if (this.props.coffees) {
      coffeeLogItems = this.props.coffees.map((coffee, index) => {
        return (
          <li key={index} className="coffee-item">
            <strong>
              {coffee.kind}
              {coffee.sugar ? ' with sugar' : ''}
              {(coffee.milk && coffee.sugar) ? ' and milk' : (coffee.milk ? ' with milk' : '')}
              , {coffee.size} -
            </strong> <span className="italic">"{coffee.comment}"</span>, by {coffee.author}
            <button title="Delete this coffee log" onClick={this.deleteItself.bind(this, coffee.id)}>X</button>
          </li>
        );
      });
    }
    return (
      <div className="coffee-log">
        <h3>Latest coffees made</h3>
        {coffeeLogItems}
      </div>
    );
  }
}

CoffeeLog.propTypes = {
  coffees: PropTypes.array,
  deleteCoffee: PropTypes.func
}

export default CoffeeLog;