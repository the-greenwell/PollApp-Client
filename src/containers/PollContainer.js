import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { PollContext } from '../PollContext'
import { capitalize, formatTime, removeLS } from '../helpers.js'

import PollService from '../poll.service.js'
import ShareLink from '../components/ShareLink'
import Option from '../components/Option'
import Error from '../components/Error'
import CountDown from '../components/CountDown'

import '../styles/poll.css'


export default function PollContainer(){
  const { loggedIn, poll, error } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;
  const [votingError, setVotingError] = error;

  const params = useParams();
  const navigate = useNavigate();

  const voteHandler = (optionId) => {
    try {
      PollService.castVote(pollValue._id,optionId).then((data)=> {
        setPollValue({...pollValue, options: data?.updatedOptions});
      }).catch((err)=>{
        setVotingError({error: true, message: err.message})
      })
    } catch (err) {
      setVotingError({error: true, message: err.message})
    } finally {
      navigate('/results/' + pollValue._id)
    }
  }

  useEffect(()=>{
    if(Object.keys(pollValue).length === 0) {
      PollService.getPoll(params.id).then((data) => {
        setPollValue(data.poll)
      })
    }
  },[])

  return(
    <div className='pollContainer'>
      <Error />
      <h1> {pollValue.subject && capitalize(pollValue.subject)} </h1>

      <CountDown props={{value: pollValue?.expires, removeLS: removeLS}}/>

      <div className='options'>
        {pollValue?.options?.map(opt => {
          return <Option key={opt._id} props={{option:opt,voteHandler:voteHandler}} />
        })}
      </div>

      <ShareLink props={{shareLink: `${window.location.origin}/poll/${pollValue._id}`}}/>
    </div>
  )
}
