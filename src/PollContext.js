import React, { useState, createContext } from 'react'

export const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [poll, setPoll] = useState({});

  return(
    <PollContext.Provider value={{loggedIn: [isLoggedIn, setLoggedIn], poll: [poll, setPoll]}}>
      { children }
    </PollContext.Provider>
  )
}
