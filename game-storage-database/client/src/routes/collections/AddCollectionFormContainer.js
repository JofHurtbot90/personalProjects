import React, {Component} from 'react';
import AddCollectionForm from './AddCollectionForm';
import {connect} from 'react-redux';
import {addCollection} from '../../../redux/actions';

class AddCollectionFormContainer extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      slug: '',
      url: '',
      games: []
    }
  }

  handleChange(e) {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clearInputs(){
    this.setState({
      name: '',
      slug: '',
      url: '',
      games: []
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.addCollection();
  }

  render(){
    return(
      <div className='collection-content'>
        <form onChange={this.handleChange}>
          <input onSubmit={this.handleSubmit}
            value={this.state.name}
            name='name'
            type="number"
            placeholder='Name'/>
        </form>
      </div>
    )
  }
}
