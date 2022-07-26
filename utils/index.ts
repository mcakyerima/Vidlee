import axios from 'axios';
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: {name: string, picture: string, sub: string } = jwt_decode(response.credential)

  const { name , picture, sub } = decoded


  // creating a sanity type for user
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  // adding user to the persistend state
  addUser(user)

  // post our user credentials to api
  await axios.post('http://localhost:3000/api/auth', user)
  
};