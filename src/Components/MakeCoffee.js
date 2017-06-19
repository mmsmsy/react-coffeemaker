import React, { Component } from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';
import $ from 'jquery';

class MakeCoffee extends Component {
  constructor() {
    super();
    this.state = {
      acceptableFormData: true,
      newCoffee: {}
    }
  }

  static defaultProps = {
    coffeeTypes: ['Capuccino','Frappe','Machiatto','Americano'],
    acceptedChars: /^[0-9a-zA-Z-\s]+$/
  }

  handleChange = (event) => {
    const elem = event.target;
    if (elem.value !== '') {
      if (elem.value.match(this.props.acceptedChars)) {
        $(elem)
          .removeClass('not-acceptable-form-data')
          .addClass('acceptable-form-data');

        this.setState({acceptableFormData: true});
      } else {
        $(elem)
          .removeClass('acceptable-form-data')
          .addClass('not-acceptable-form-data');
        
        this.setState({acceptableFormData: false});
      }
    } else {
      $(elem).removeClass('acceptable-form-data not-acceptable-form-data');

      this.setState({acceptableFormData: true});
    }
    event.preventDefault();
  }

  handleSubmit = (event) => {

    if (this.refs.author.value === '' || this.refs.comment.value === '') alert ('All fields are required');
    else {
      if (this.refs.author.value.match(this.props.acceptedChars) && this.refs.comment.value.match(this.props.acceptedChars)) {
        this.setState({newCoffee:{
          id: uuid.v4(),
          author: this.refs.author.value,
          coffeeType: this.refs.coffeeType.value,
          sugar: this.refs.sugar.checked,
          milk: this.refs.milk.checked,
          comment: this.refs.comment.value
        }}, function() {
          this.props.makeCoffee(this.state.newCoffee);
        });
      } else alert ('Only alphanumeric values, please');
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
          <input type='text' ref='author' onChange={this.handleChange} />
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
          <input type='text' ref='comment' onChange={this.handleChange} />
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