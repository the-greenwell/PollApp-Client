export default function ShareLink({props}){
  const handleClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(props.shareLink)
  }
  return(
    <div className='shareLink'>
      <p>Shareable link: <a href={props.shareLink} onClick={(e)=>handleClick(e)}>{props.shareLink}</a></p>
    </div>
  )
}
