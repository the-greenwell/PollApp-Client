
import React, { createContext, useState } from 'react'

import { Outlet } from 'react-router-dom'

export const FormContext = React.createContext()

export default function HomeContainer(){
  const [formType, setFormType] = useState('newPoll')
  return(
    <div className='container'>
      <FormContext.Provider value={{type: formType}}>
        <Outlet />
      </FormContext.Provider>
    </div>
  )
}
