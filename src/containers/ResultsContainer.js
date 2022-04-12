import { capitalize, removeLS } from '../helpers.js'
import { PollContext } from '../PollContext'
import PollService from '../poll.service.js'
import ShareLink from '../components/ShareLink'
import CountDown from '../components/CountDown'
import Error from '../components/Error'

import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import '../styles/poll.css'

export default function ResultsContainer(){
  const { loggedIn, poll, error } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;
  const [votingError, setVotingError] = error;

  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!pollValue) {
      navigate('/newPoll')
    } else if (Object.keys(pollValue).length === 0) {
      PollService.getPoll(params.id).then((data) => {
        setPollValue(data.poll)
      })
    }
  },[])

  return(
    <div className="pollContainer">

      <Error />

      <h1>{pollValue?.subject && capitalize(pollValue.subject)}</h1>

      <CountDown props={{value: pollValue?.expires, removeLS: removeLS}}/>

      <div className='options'>
        {pollValue?.options?.map(opt => {
          return <p key={opt._id}>{capitalize(opt.description)}: {opt.votes}</p>
        })}
      </div>

      <ShareLink props={{shareLink: `${window.location.origin}/results/${pollValue?._id}`}}/>
    </div>
  )
}
