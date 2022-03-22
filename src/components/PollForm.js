import { useState, useEffect } from 'react'
import Input from './Input'
import '../styles/form.css'

export default function PollForm({ type }){
    const [fields,setFields] = useState([]);
    const [options,setOptionsTotal] = useState(0);

    useEffect(()=>{
      type === 'newPoll' ?
          setFields([
            {name: "subject", label: "Subject", type: "text" },
            {name: "author", label: "Author", type: "text" },
            {name: "password", label: "Password", type: "password" },
            {name: "confirmPassword", label: "Confirm Password", type: "password" },
            {name: "expires", label: "Expires in...", type: "time" },
            {name: "format", label: "Results Format", type: "text" }])
        :
          setFields([{name: "format", label: "Results Format", type: "text" }])
      },[])

    useEffect(()=>{
      if(options > 0){
        setFields([...fields,{name:`option${options}`,label: `Option ${options}`, type: 'text', focus: true}])
      }
    },[options])

    const increaseOptions = () => {
      setOptionsTotal(options + 1)
    }

    return(
      <div className='form'>
        { type === 'newPoll'  ?  <button onClick={increaseOptions}>Button</button> : ''}
        {fields.map(x => {
          return (<Input key={x.name} props={x} />)
        })}
      </div>
    )
}
