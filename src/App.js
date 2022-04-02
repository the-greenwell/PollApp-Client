import Navbar from './containers/Navbar'
import HomeContainer from './containers/HomeContainer'
import InfoContainer from './containers/InfoContainer'
import './styles/global.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeContainer />
    </div>
  );
}

export default App;
