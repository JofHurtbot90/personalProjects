import axios from 'axios';

const SET_COLLECTIONS = 'SET_COLLECTIONS';
const collectionUrl = 'https://api-endpoint.igdb.com/collections/'
const userUrl = 'http://localhost:7000/auth/';
const profileUrl = 'http://localhost:7000/profile/';

axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

function setCollections(collections){
  return {
    type: 'SET_COLLECTIONS',
    collections
  }
}

export function loadCollections(){
  return dispatch =>{
    axios.get(collectionUrl).then(response => {
      dispatch(setCollections(response.data));
    })
    .catch(err =>{
      console.error(err);
    })
  }
}

exort function addCollection(collection){
  return dispatch =>{
    axios.post(collectionUrl, collection).then(response =>{
      dispatch(loadCollections());
    })
    .catch(err =>{
      console.error(err);
    })
  }
}

export function editCollection(id, collection){
  return dispatch =>{
    axios.put(collectionUrl + id, collection).then(response =>{
      dispatch(loadCollections());
    })
    catch(err =>{
      console.error(err);
    })
  }
}

export function deleteCollection(id){
  return dispatch =>{
    axios.delete(collectionUrl + id).then(response =>{
      dispatch(loadCollections());
    })
    catch(err =>{
      console.error(err);
    })
  }
}

export function verify(){
  return (dispatch) =>{
    axios.get(profileUrl + 'verify').then((response)=>{
      let {success, user} = response.data;
      dispatch(logon(success, user));
    })
    .catch((err)=>{
      console.error(err);
    })
  }
}

export function signup(credentials){
  return dispatch =>{
    axios.post(userUrl + 'signup', credentials).then(response =>{
    let {token, user, success} = response.data;
    localStorage.setItem('token', token);
    })
    .catch(err =>{
      console.error(err);
    });
  }
}

export function login(credentials){
  return (dispatch) =>{
    axios.post(userUrl + 'login', credentials).then(response =>{
      let {token, user, success} =response.data;
      localStorage.setItem('token', token);
      dispatch(logon(success, user));
    })
    .catch(err) =>{
      console.error(err);
      dispatch(handleAuthErr)
    }
  }
}

function logon(success, user){
  return {
    type: 'LOGON',
    success,
    user
  },
  let {token, user, success} = response.data;
  localStorage.setItem('token', token);
  dispatch(logon(success, user));
}

export function logout(){
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT'
  }
}


function handleAuthErr(key, errCode){
  return {
    type: 'HANDLE_AUTH_ERR',
    key,
    errCode
  }
  .catch((err)=>{
    console.error(err);
    dispatch(handleAuthErr('signup', err.response.status));
  })
}

const initialCollections = [];

export default function collectionsReducer(collections = initialCollections, action){
  switch(action.type){
    case 'SET_COLLECTIONS':
      return [...action.todos]
    default:
      return collections
  }
}
