export default function Input({ props, register }){
  return(
    <div className='input-group'>
      <label htmlFor={props.name}>{props.label}</label>
      <input type={props.type} name={props.name} autoFocus={props.focus} min={props.min} max={props.max} {...register(props.name)}/>
    </div>
  )
}
