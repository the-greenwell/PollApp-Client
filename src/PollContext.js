import React, { useState, createContext, useEffect } from 'react'

export const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [poll, setPoll] = useState({});
  const [votingError, setVotingError] = useState({error: false, message: null})

  return(
    <PollContext.Provider value={{loggedIn: [isLoggedIn, setLoggedIn], poll: [poll, setPoll], error: [votingError, setVotingError]}}>
      { children }
    </PollContext.Provider>
  )
}
