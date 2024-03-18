import {useState} from 'react'
import useAuthContext from "./useAuthContext";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContext();
  const login = async(email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('/api/user/login', {email, password});
      console.log(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({type: 'LOGIN', payload: response.data});
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
      console.log(error.response.data.error);
    }
  }
  return {login, isLoading, error}
}

export default useLogin
