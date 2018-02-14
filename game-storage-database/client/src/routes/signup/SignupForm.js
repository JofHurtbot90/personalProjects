import React from 'react';

function SignupForm(props){
  return(
    <div className='form-content'>
      <form onSubmit={props.handleSubmit}>
          <h3>Sign Up</h3>
        <input  onChange={props.handleChange}
                value={props.username}
                name='username'
                type="text"
                placeholder='@Username'/>
        <input  onChange={props.handleChange}
                value={props.email}
                name='email'
                type="email"
                placeholder='Email'/>
        <input  onChange={props.handleChange}
                value={props.password}
                name='password'
                type="password"
                placeholder='#'/>
        <button type='submit'>Create Account</button>
          <p>{this.props.errMsg}</p>
      </form>
    </div>
  )
}

export default SignupForm;
