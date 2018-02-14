import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './redux/actions/index';

class Navbar extends Component{
  render(){
    const isAuthenticated = this.props.isAuthenticated;
    return(
      <div className='navbar-content'>
        {isAuthenticated ? null: <div className='nav-link'><Link to='/'></Link></div>}
      {isAuthenticated ? null: <div className='nav-link'><Link to='/login'></Link></div>}
    {isAuthenticated ? <div className='nav-link'><Link to='/collections'></Link></div>: null}
  {isAuthenticated ? <div className='nav-link'><Link to='/profile'></Link></div>: null}
{isAuthenticated ? <div className='nav-link'><button onClick={this.props.logout}>Logout</button></div>: null}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state;
}

export default connect(mapStateToProps, {logout})(Navbar);
