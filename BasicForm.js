import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class BasicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      nameErrorMsg: '',
      emailErrorMsg: '',
      phoneErrorMsg: '',
    };

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const name = this.nameInput.current.value;
    const email = this.emailInput.current.value;
    const phoneNumber = this.phoneInput.current.value;

    // Validates persons name
    this.setState({ nameErrorMsg: !name.trim() ? 'Name is required' : '' });

    // Validates persons email
    this.setState({
      emailErrorMsg: !email.trim()
        ? 'Email is required'
        : !/^\S+@\S+\.\S+$/.test(email)
        ? 'Invalid email format'
        : '',
    });

    // Validates persons phone number
    this.setState({
      phoneErrorMsg: !/^\d{10}$/.test(phoneNumber) ? 'Phone number must be 10 digits' : '',
    });

    // Check if there are any errors
    if (name.trim() && email.trim() && /^\d{10}$/.test(phoneNumber)) {
      // checks if a person with the same name, email, or phone already exist
      const personExist = this.state.persons.some(
        (person)=>
        //parses name to lowecase and email to lowercase to make it easier to see a match
        person.name.toLowerCase() === name.toLowerCase() ||
        person.email.toLowerCase() === email.toLowerCase() ||
        person.phoneNumber === phoneNumber
      );
      if (!personExist){
      const registration = { name, email, phoneNumber };
      const persons = [...this.state.persons, registration];
      this.setState({ persons });

      // Reset input fields
      this.nameInput.current.value = '';
      this.emailInput.current.value = '';
      this.phoneInput.current.value = '';
      }else{
        alert('Person with same name, email, or phone number already exist');
      }
      
    }
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.handleFormSubmit}>
          
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              ref={this.nameInput}
              style={{ marginRight: '10px' }}
            />
            {this.state.nameErrorMsg && (
              <div style={{ color: 'red', marginLeft: '5px' }}>{this.state.nameErrorMsg}</div>
            )}
          </div>

          
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              ref={this.emailInput}
              style={{ marginRight: '10px' }}
            />
            {this.state.emailErrorMsg && (
              <div style={{ color: 'red', marginLeft: '5px' }}>{this.state.emailErrorMsg}</div>
            )}
          </div>

          
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="tel"
              placeholder="Phone Number"
              ref={this.phoneInput}
              style={{ marginRight: '10px' }}
            />
            {this.state.phoneErrorMsg && (
              <div style={{ color: 'red', marginLeft: '5px' }}>{this.state.phoneErrorMsg}</div>
            )}
          </div>

          
          <input type="submit" />
        </form>

        
        <div>
          <h3>Signed Up</h3>
          <ul>
            {this.state.persons.map((entry, index) => (
              <li key={index}>
                Name: {entry.name}, Email: {entry.email}, Phone: {entry.phoneNumber}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BasicForm />, document.getElementById('root'));

export default BasicForm;
