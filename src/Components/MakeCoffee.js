import React, { Component } from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid';
import $ from 'jquery';

class MakeCoffee extends Component {
  constructor() {
    super();
    this.state = {
      newCoffee: {}
    }
  }

  static defaultProps = {
    kinds: ['Cappuccino','Frappe','Macchiato','Americano'],
    sizes: ['Small','Medium','Large'],
    acceptedChars: /^[0-9a-zA-Z-\s]+$/
  }

  handleInputChange = (event) => {
    const elem = event.target;
    if (elem.value !== '') {
      if (elem.value.match(this.props.acceptedChars)) {
        $(elem)
          .removeClass('not-acceptable-form-data')
          .addClass('acceptable-form-data');
      } else {
        $(elem)
          .removeClass('acceptable-form-data')
          .addClass('not-acceptable-form-data');
      }
    } else {
      $(elem).removeClass('acceptable-form-data not-acceptable-form-data');
    }

    if (this.refs.author.value === '' && this.refs.comment.value === '') {
      $('.form-submit-button').removeClass('acceptable-form-data not-acceptable-form-data');
    } else {
      if (!this.refs.author.value.match(this.props.acceptedChars) || !this.refs.comment.value.match(this.props.acceptedChars)) {
        $('.form-submit-button')
          .removeClass('acceptable-form-data')
          .addClass('not-acceptable-form-data');
      } else {
        $('.form-submit-button')
          .removeClass('not-acceptable-form-data')
          .addClass('acceptable-form-data');
      }
    }
  }

  clearAuthorInput = (event) => {
    this.refs.author.value = '';
    this.handleInputChange(event);
    event.preventDefault();
  }
  clearCommentInput = (event) => {
    this.refs.comment.value = '';
    this.handleInputChange(event);
    event.preventDefault();
  }

  handleSubmit = (event) => {
    if (this.refs.author.value === '' || this.refs.comment.value === '') alert ('All fields are required.');
    else {
      if (this.refs.author.value.match(this.props.acceptedChars) && this.refs.comment.value.match(this.props.acceptedChars)) {
        this.setState({newCoffee:{
          id: uuid.v4(),
          author: this.refs.author.value,
          kind: this.refs.kind.value,
          sugar: this.refs.sugar.checked,
          milk: this.refs.milk.checked,
          size: this.refs.size.value,
          comment: this.refs.comment.value
        }}, function() {
          this.props.makeCoffee(this.state.newCoffee);
        });
      } else alert ('Only alphanumeric values, please.');
    }
    event.preventDefault();
  }

  render() {
    const coffeeKindOptions = this.props.kinds.map(kind => {
      return <option key={kind} value={kind}>{kind}</option>
    });
    const coffeeSizeOptions = this.props.sizes.map(size => {
      return <option key={size} value={size}>{size}</option>
    });

    return (
      <form className='coffee-machine-form' onSubmit={this.handleSubmit}>
        <label>
          <span>Author</span>
          <span className='span-input'>
            <input type='text' ref='author' maxLength='18' onChange={this.handleInputChange} />
            <button className='button-clear-input' title='Clear' onClick={this.clearAuthorInput}>X</button>
          </span>
        </label>
        <label>
          <span>Coffee kind</span>
          <select ref='kind'>
            {coffeeKindOptions}
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
          <span>Coffee size</span>
          <select ref='size'>
            {coffeeSizeOptions}
          </select>
        </label>
        <label>
          <span>Comment</span>
          <span className='span-input'>
            <input type='text' ref='comment' maxLength='140' onChange={this.handleInputChange} />
            <button className='button-clear-input' title='Clear' onClick={this.clearCommentInput}>X</button>
          </span>
        </label>
        <input className='form-submit-button' type='submit' value='Submit' />
      </form>
    );
  }
}

MakeCoffee.propTypes = {
  kinds: propTypes.array,
  sizes: propTypes.array,
  makeCoffee: propTypes.func
}

export default MakeCoffee;