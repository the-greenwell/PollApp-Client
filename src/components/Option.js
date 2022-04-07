import { capitalize } from '../helpers.js'

export default function Option({props}){
  return(
    <>
      <button onClick={()=> props.voteHandler(props.option._id)}>{capitalize(props.option.description)}</button>
    </>
  )
}
