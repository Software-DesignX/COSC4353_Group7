import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { clientWithAuth } from './axiosClient'
import './styling.css'

const Profile = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  const [profile, setProfile] = useState({
    fullname: '...',
    address1: '...',
    address2: '...',
    city: '...',
    state: '...',
    zipcode: '...',
  })

  useEffect(() => {
    if (!token) {
      localStorage.clear()
      navigate('/login')
    } else {
      clientWithAuth(token).get('/profile/' + username).then((response) => {
        console.log(response.data)
        setProfile(response.data)
      })
    }
  }, [])

  return (
    <>
      <br />
      <center>
        <h1 className='h1'>CLIENT PROFILE</h1>
      </center>
      <div className='container'>
        <label className='label' htmlFor='fullname'>
          Full Name:{' '}
        </label>
        <input type='text' value={profile.fullname} />
        <br />
        <label className='label' htmlFor='address'>
          Address:{' '}
        </label>
        <input type='text' value={profile.address1 + profile.address2} />
        <label className='label' htmlFor='city'>
          City:{' '}
        </label>
        <input type='text' value={profile.city} />
        <label className='label' htmlFor='state'>
          State:{' '}
        </label>
        <input type='text' value={profile.state} />
        <label className='label' htmlFor='zipcode'>
          Zip Code:{' '}
        </label>
        <input type='text' value={profile.zipcode} />
        <h1 className='heading3'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Want to edit your profile?
          {/* <a className='anchor' href='/profile/edit'>
            Click here
          </a> */}
          <Link className='anchor' to="/profile/edit">
            Click here
          </Link>
        </h1>
      </div>
    </>
  )
}

export default Profile
