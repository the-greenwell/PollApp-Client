export default function ShareLink({props}){
  const handleClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(props.shareLink)
  }
  const check = window.location.pathname.split('/').at(1);

  return (
    <div className='shareLink'>
      <p><a href={props.shareLink} onClick={(e)=>handleClick(e)}>{`Click here to copy the ${check} link`}</a></p>
    </div>
  )
}
