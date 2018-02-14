let defaultState = {
  collections: [],
  user: {
    username: '',
    admin: false,
    _id: ''
  },
  authErrCode: {
    signup: '',
    login: ''
  },
  isAuthenticated: false
}

switch(action.type){
  case 'LOGON':
  return{
    ...state,
    user: action.user,
    isAuthenticated: action.success
    authErrCode: {
      signup: '',
      login: ''
    }
  }
  case 'LOGOUT':
  return {
    ...defaultState
  }
}
 switch(action.type){
   case 'HANDLE_AUTH_ERR':
   return {
     ..state,
     authErrCode: {
       ...state.authErrCode,
       [action.key]: action.errCode
     }
   }
 }
