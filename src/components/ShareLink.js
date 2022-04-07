export default function ShareLink({props}){
  return(
    <div className='shareLink'>
      <p>Shareable link: <a href={props.shareLink}>{props.shareLink}</a></p>
    </div>
  )
}
