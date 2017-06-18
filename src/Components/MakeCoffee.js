import React, { Component } from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';

class MakeCoffee extends Component {
  constructor() {
    super();
    this.state = {
      newCoffee: {}
    }
  }

  static defaultProps = {
    coffeeTypes: ['Capuccino','Frappe','Machiatto','Americano']
  }

  handleSubmit = (event) => {
    if (this.refs.author.value === '' || this.refs.comment.value === '') alert ('All fields are required');
    else {
      this.setState({newCoffee:{
        id: uuid(),
        author: this.refs.author.value,
        coffeeType: this.refs.coffeeType.value,
        sugar: this.refs.sugar.checked,
        milk: this.refs.milk.checked,
        comment: this.refs.comment.value
      }}, function() {
        this.props.makeCoffee(this.state.newCoffee);
      });
    }
    event.preventDefault();
  }

  render() {
    const coffeeTypesOptions = this.props.coffeeTypes.map(coffeeType => {
      return <option key={coffeeType} value={coffeeType}>{coffeeType}</option>
    });

    return (
      <form className='coffee-machine-form' onSubmit={this.handleSubmit}>
        <label>
          <span>Author</span>
          <input type='text' ref='author' />
        </label>
        <label>
          <span>Coffee type</span>
          <select ref='coffeeType'>
            {coffeeTypesOptions}
          </select>
        </label>
        <label>
          <span>Sugar</span>
          <input type='checkbox' ref='sugar' />
        </label>
        <label>
          <span>Milk</span>
          <input type='checkbox' ref='milk' />
        </label>
        <label>
          <span>Comment</span>
          <input type='text' ref='comment' />
        </label>
        <input type='submit' value='Submit' className='form-submit-button' />
      </form>
    );
  }
}

MakeCoffee.propTypes = {
  coffeeTypes: propTypes.array,
  makeCoffee: propTypes.func
}

export default MakeCoffee;