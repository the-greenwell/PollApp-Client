import { useState, useContext, useEffect } from 'react'
import { PollContext } from '../PollContext'
import PollService from '../poll.service.js'
import ShareLink from '../components/ShareLink'
import Option from '../components/Option'
import CountDown from '../components/CountDown'
import '../styles/poll.css'

import { capitalize, formatTime } from '../helpers.js'

import moment from 'moment'
import { useParams } from 'react-router-dom'

export default function PollContainer({props}){
  const { loggedIn, poll } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;

  const params = useParams();

  const voteHandler = (optionId) => {
    PollService.castVote(params.id,optionId).then((data)=>{
      setPollValue({...pollValue, options: data.updatedOptions})
    })
  }

  const formatCountdown = () => {
    let diffTime = moment(pollValue.expires).valueOf() - moment().valueOf()
    let duration = moment.duration(diffTime, 'milliseconds')
    if(duration._milliseconds > 0) {
      return {...formatTime(duration._milliseconds)}
    }
  }

  useEffect(()=>{
    if(Object.keys(pollValue).length === 0) {
      PollService.getPoll(params.id).then((data) => {
        setPollValue(data.poll)
      })
    }
  },[])

  const [timeLeft, setTimeLeft] = useState(formatCountdown());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(formatCountdown());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return(
    <div className='pollContainer'>
      <h1> {pollValue.subject && capitalize(pollValue.subject)} </h1>

      <CountDown props={timeLeft}/>

      <div className='pollOptions'>
        {pollValue?.options?.map(opt => {
          return <Option key={opt._id} props={{option:opt,voteHandler:voteHandler}} />
        })}
      </div>

      <ShareLink props={{shareLink: `${window.location.origin}/poll/${pollValue._id}`}}/>
    </div>
  )
}
