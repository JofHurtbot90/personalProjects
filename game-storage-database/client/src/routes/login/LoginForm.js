import React from 'react';

function LoginForm(props){
  return(
    <div className='form-content'>
      <form onSubmit={props.handleSubmit}>
        <input  onChange={props.handleChange}
                value={props.username}
                name='username'
                type="text"
                placeholder='@Username'/>
        <input  onChange={props.handleChange}
                value={props.password}
                name='password'
                type="password"
                placeholder='#'/>
        <button type='submit'>Submit</button>
          <p>{this.props.errMsg}</p>
      </form>

    </div>
  )
}
