import NavLink from '../components/NavLink.js'
import '../styles/navbar.css'

export default function NavBar() {
  return (
    <div className='Navbar'>
      <span>
        <p>Poll-Share</p>
        <NavLink linkHref='#newpoll' linkText='New Poll' />
        <NavLink linkHref='#howto' linkText='About' />
      </span>
    </div>
  )
}
