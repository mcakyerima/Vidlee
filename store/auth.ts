import create from 'zustand'
import { persist } from 'zustand/middleware';
import axios from 'axios';

// we are using zustand library to make our user state persistent even if our pag
// reloads, we are still gonna have user logged in to our app
// we then pass user credentials to sanity client for creating user

const authStrore = (set: any) => ({
    userProfile: null,
    // addUser is going to be called inside our user utility function
    addUser: (user: any) => set({userProfile: user}),
    removeUser: () => set({userProfile: null}),
})

const useAuthStore = create(
    persist(authStrore, {
        name: 'auth'
    })
)

export default useAuthStore;