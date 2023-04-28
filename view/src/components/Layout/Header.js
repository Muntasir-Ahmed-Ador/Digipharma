import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaPills} from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import SearchInput from '../Form/SearchInput.js';
import { useCart } from '../../context/cart';

function Header() {
  const [auth,setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
    localStorage.removeItem('auth')
    toast.success("Logged Out Successfully");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand"><FaPills/> DigiPharma</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <Link to='/' className="nav-link">Home</Link>
              </li>
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to='/register' className="nav-link" href="#">Sign-Up</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
                  </li>
                </>) : (<>

                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{auth?.user?.username}</NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1? 'admin' : 'user'}`} className="dropdown-item">Dashboard</NavLink> 
                      </li>
                      <li><NavLink onClick={handleLogout} className="dropdown-item" to='/login' >Logout</NavLink></li>
                    </ul>
                  </li>

                </>)
              }
              <li className="nav-item">
                <NavLink to='/cart' className="nav-link" href="#">Cart({cart?.length})</NavLink>
              </li>
            </ul>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Header

