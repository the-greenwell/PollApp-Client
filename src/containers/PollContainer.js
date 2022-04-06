import { useState, useContext } from 'react'
import { PollContext } from '../PollContext'

export default function PollContainer({props}){
  const { loggedIn, poll } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;

  return(
    <>
      <h1> {pollValue?.subject} </h1>
      {pollValue?.options?.map(opt => {
        return <p> {opt.description} </p>
      })}
    </>
  )
}
