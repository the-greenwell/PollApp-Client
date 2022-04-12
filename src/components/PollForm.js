import Select from './Select'
import Input from './Input'
import '../styles/form.css'
import { newPollFields, updatePollFields } from '../helpers.js'
import { FormContext } from '../containers/HomeContainer'
import { PollContext } from '../PollContext'
import PollService from '../poll.service.js'

import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function PollForm({ props }){
    const [formFields,setFields] = useState([]);
    const [options,setOptionsTotal] = useState(2);

    const formProps = useContext(FormContext)
    const { poll, error } = useContext(PollContext);
    const [pollValue, setPoll] = poll;
    const [errorMessage, setError] = error;
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
      subject: Yup.string().required('"Subject" is required'),
      password: Yup.string().required('"Password" is required').min(6, 'Password must be 6 characters').oneOf([Yup.ref('confirmPassword')], 'Passwords must match'),
      confirmPassword: Yup.string().required('"Confirm Password" is required').oneOf([Yup.ref('password')], 'Passwords must match'),
      format: Yup.string().default('default'),
      expires: Yup.number().typeError('"Expires" must be a valid number').positive().integer().default(5),
      options: Yup.array().of(
        Yup.object().shape({
          description: Yup.string().typeError('"Option" invalid').test('description', 'This field is required', (opt) => {
            return opt.trim() ? true : false;
          })
        })
      )
    });
    const formOptions = {resolver: yupResolver(validationSchema)}

    const {
      handleSubmit,
      register,
      control,
      reset,
      formState
    } = useForm(formOptions)
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({name: 'options', control})


    useEffect(()=>{
      formProps.type === 'newPoll' ?
          setFields(newPollFields) : setFields(updatePollFields);
      setOptionsTotal(2);
    },[])

    useEffect(() => {
       const oldVal = fields.length;
       if (options > oldVal && oldVal < 8 || oldVal < 2) {
           for (let i = oldVal; i < options; i++) {
               append({description: ''});
           }
       } else {
           for (let i = oldVal; i > options; i--) {
               remove(i - 1);
           }
       }
    }, [options]);

    const increaseOptions = (e) => {
      e.preventDefault();
      if(options < 8) setOptionsTotal(options + 1)
    }

    const decreaseOptions = (e) => {
      e.preventDefault();
      if(options > 2) setOptionsTotal(options - 1)
    }

    const dateFormat = (minutes) => {
      const now = new Date();
      return new Date(now.getTime() + minutes*60000)
    }

    const onSubmit = (data) => {
      const formatted = {...data, expires: dateFormat(data.expires)}
      PollService.newPoll(formatted).then(async (createdPoll) => {
        setPoll(createdPoll.poll)
        navigate('/poll/'+createdPoll.poll._id)
      }).catch((err)=>{
        navigate('/newpoll')
      })
    }

    return(
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        { formProps.type === 'newPoll'  ?  (
          <span>
            <button onClick={increaseOptions}>Add Option</button>
            <button onClick={decreaseOptions}>Delete Option</button>
            <button type='submit'>Submit Form</button>
          </span>
        ) : ''}
        {formFields.map((x,i) => {
          return (
            x.type === 'select' ?
              (
                <>
                  <Select
                    key={x.name}
                    props={x}
                    register={register} />
                  <div className="is-invalid" key={`error-${i}`}>{errors[x.name]?.message}</div>
                </>
              )
            :
            (
              <Input
                key={x.name}
                props={x}
                register={register}/>
            )
          )
        })}
        {fields.map((x,i) => {
          return (
            <>
              <Input
                key={x.id}
                props={{
                  type: 'text',
                  focus: true,
                  name:`options.${i}.description`,
                  label: `Option ${i+1}`}}
                register={register} />
              <div className="is-invalid" key={`error-${i}`}>{errors.options?.[i]?.description?.message}</div>
            </>
          )
        })}
      </form>
    )
}
