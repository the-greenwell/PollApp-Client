import {useEffect, useState} from 'react'
import { formatTime } from '../helpers.js'

export default function CountDown({ props }){
  const formatCountdown = () => {
    let expires = new Date(props.value);
    let now = new Date();
    let diffTime = expires.getTime() - now.getTime()
    if(diffTime > 0) {
      return {...formatTime(diffTime)}
    }
  }
  const [timeLeft, setTimeLeft] = useState(formatCountdown());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(formatCountdown());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if(!timeLeft) {
      const remove = props.removeLS
      remove()
    }
  },[timeLeft])

  return(
    <>
      <p>{timeLeft ? `Expires in: ${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`: 'EXPIRED'}</p>
    </>
  )
}
