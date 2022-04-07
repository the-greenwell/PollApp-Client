import { useState, useContext, useEffect } from 'react'
import { PollContext } from '../PollContext'
import PollService from '../poll.service.js'
import ShareLink from '../components/ShareLink'
import Option from '../components/Option'
import '../styles/poll.css'

import { useParams } from 'react-router-dom'

export default function PollContainer({props}){
  const { loggedIn, poll } = useContext(PollContext)
  const [isLoggedIn, setLoggedIn] = loggedIn;
  const [pollValue, setPollValue] = poll;

  const params = useParams();

  useEffect(()=>{
    if(Object.keys(pollValue).length === 0) {
      PollService.getPoll(params.id).then((data) => {
        setPollValue(data.poll)
      })
    }
  },[])

  const voteHandler = (optionId) => {
    PollService.castVote(params.id,optionId).then((data)=>{
      setPollValue({...pollValue, options: data.updatedOptions})
    })
  }



  return(
    <div className='pollContainer'>
      <h1> {pollValue?.subject} </h1>

      <div className='pollOptions'>
        {pollValue?.options?.map(opt => {
          return <Option key={opt._id} props={{option:opt,voteHandler:voteHandler}} />
        })}
      </div>

      <ShareLink props={{shareLink: `${window.location.origin}/poll/${pollValue._id}`}}/>
    </div>
  )
}
