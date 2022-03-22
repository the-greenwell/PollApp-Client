export default function Input({ props }){
  return(
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input type={props.type} name={props.name} autoFocus={props.focus}/>
    </>
  )
}
