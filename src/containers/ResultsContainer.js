import { capitalize } from '../helpers.js'
import { PollContext } from '../PollContext'
import PollService from '../poll.service.js'
import ShareLink from '../components/ShareLink'

import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import '../styles/poll.css'

export default function ResultsContainer(){
  const { loggedIn, poll } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;

  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(pollValue)
  },[pollValue])

  useEffect(()=>{
    if(Object.keys(pollValue).length === 0) {
      PollService.getPoll(params.id).then((data) => {
        navigate('/results/'+data.poll._id)
      })
    }
  },[])

  return(
    <div className="pollContainer">
      <h1>{pollValue.subject && capitalize(pollValue.subject)}</h1>

      <div className='options'>
        {pollValue?.options?.map(opt => {
          return <p key={opt._id}>{opt.description}: {opt.votes}</p>
        })}
      </div>

      <ShareLink props={{shareLink: `${window.location.origin}/results/${pollValue._id}`}}/>
    </div>
  )
}
