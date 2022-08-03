import create from 'zustand'
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '../utils';

// we are using zustand library to make our user state persistent even if our pag
// reloads, we are still gonna have user logged in to our app
// we then pass user credentials to sanity client for creating user

const authStrore = (set: any) => ({
    userProfile: null,
    // addUser is going to be called inside our user utility function
    addUser: (user: any) => set({userProfile: user}),
    removeUser: () => set({userProfile: null}),
    // initialize all users as an empty array
    allUsers: [],


    // fetching all users from
    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);

        // use the zustand setter function to set all users to the response we recieve from api call
    set({allUsers: response.data})
    console.log("allUsers" , response.data)
        // go above and add all users to zustand store


    }
})

const useAuthStore = create(
    persist(authStrore, {
        name: 'auth'
    })
)

export default useAuthStore;