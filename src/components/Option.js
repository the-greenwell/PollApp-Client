export default function Option({props}){
  return(
    <>
      <button onClick={()=> props.voteHandler(props.option._id)}>{props.option.description}</button>
    </>
  )
}
