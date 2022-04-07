import Navbar from './containers/Navbar'
import HomeContainer from './containers/HomeContainer'
import InfoContainer from './containers/InfoContainer'
import PollForm from './components/PollForm'
import PollContainer from './containers/PollContainer'


import {PollProvider} from './PollContext'
import './styles/global.css'

import { Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <PollProvider>
          <Navbar />
            <Routes>
              <Route path='/' element={<HomeContainer />} >
                <Route path='newpoll' element={<PollForm />} />
                <Route path='poll/:id' element={<PollContainer />} />
              </Route>
            </Routes>
      </PollProvider>
    </div>
  );
}

export default App;
