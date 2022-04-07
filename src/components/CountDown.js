export default function CountDown({ props }){
  return(
    <>
      <p>{props ? `Expires in: ${props.hours}:${props.minutes}:${props.seconds}`: 'EXPIRED'}</p>
    </>
  )
}
