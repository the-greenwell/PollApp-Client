import { useState, useContext, useEffect } from 'react'
import { PollContext } from '../PollContext'
import PollService from '../poll.service.js'
import ShareLink from '../components/ShareLink'
import Option from '../components/Option'
import CountDown from '../components/CountDown'
import '../styles/poll.css'
import { useNavigate } from 'react-router-dom'

import { capitalize, formatTime } from '../helpers.js'

import moment from 'moment'
import { useParams } from 'react-router-dom'

export default function PollContainer(){
  const { loggedIn, poll } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;

  const params = useParams();
  const navigate = useNavigate();

  const voteHandler = (optionId) => {
    PollService.castVote(pollValue._id,optionId).then((data)=>{
      setPollValue({...pollValue, options: data.updatedOptions});
      navigate('/results/' + pollValue._id)
    })
  }
  const formatCountdown = () => {
    let diffTime = moment(pollValue.expires).valueOf() - moment().valueOf()
    let duration = moment.duration(diffTime, 'milliseconds')
    if(duration._milliseconds > 0) {
      return {...formatTime(duration._milliseconds)}
    }
  }
  const [timeLeft, setTimeLeft] = useState(formatCountdown());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(formatCountdown());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(()=>{
    if(Object.keys(pollValue).length === 0) {
      PollService.getPoll(params.id).then((data) => {
        setPollValue(data.poll)
      })
    }
  },[])

  return(
    <div className='pollContainer'>
      <h1> {pollValue.subject && capitalize(pollValue.subject)} </h1>

      <CountDown props={timeLeft}/>

      <div className='options'>
        {pollValue?.options?.map(opt => {
          return <Option key={opt._id} props={{option:opt,voteHandler:voteHandler}} />
        })}
      </div>

      <ShareLink props={{shareLink: `${window.location.origin}/poll/${pollValue._id}`}}/>
    </div>
  )
}
