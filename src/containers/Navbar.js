import NavLink from '../components/NavLink.js'
import '../styles/navbar.css'

export default function NavBar() {
  return (
    <div className='Navbar'>
      <p>Poll-Share</p>
      <NavLink props={{linkHref:'newpoll', linkText:'New Poll'}} />
      <NavLink props={{linkHref:'#howto', linkText:'About'}} />
    </div>
  )
}
