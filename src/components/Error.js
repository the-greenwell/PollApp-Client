import { useState, useEffect, useContext } from 'react'
import { PollContext } from '../PollContext'

export default function Error(){
  const { error } = useContext(PollContext)

  const [errorMessage, setError] = error;

  useEffect(() => {
    if(!errorMessage.error){
     return
    }
    const timer = setTimeout(() => {
      setError({error: false, message: null})
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMessage])

  return(
    <div>
      { errorMessage.error ? <p style={{ margin: 0, color:'red'}}>{errorMessage.message}</p> : ''}
    </div>
  )
}
