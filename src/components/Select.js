export default function Input({ props, register }){
  return(
    <div className='input-group'>
      <label htmlFor={props.name}>{props.label}</label>
      <select name={props.name} autoFocus={props.focus} {...register(props.name)}>
        {props.options.map(x => {
          return <option key={x} value={x}>{x.toUpperCase()}</option>
        })}
      </select>
    </div>
  )
}
