'use client';
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../admin_context/DoctorContext'
import { AdminContext } from '../../admin_context/AdminContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/Components/layout/ThemeToggle'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL

  const { setDToken, dToken } = useContext(DoctorContext)
  const { setAToken, aToken } = useContext(AdminContext)
  
  const router = useRouter()

  useEffect(() => {
    if (aToken) {
        router.push('/admin/dashboard')
    } else if (dToken) {
        router.push('/admin/doctor-dashboard')
    }
  }, [aToken, dToken, router])

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      try {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          router.push('/admin/dashboard')
        } else {
          toast.error(data.message)
        }
      } catch(err) {
        toast.error(err.message)
      }

    } else {

      try {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          router.push('/admin/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      } catch(err) {
        toast.error(err.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center p-4'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-base-content/10 bg-base-100 text-base-content rounded-2xl shadow-xl transition-colors relative'>
        <div className="w-full flex justify-between items-center mb-2">
          <p className='text-2xl font-bold'><span className='text-primary'>{state}</span> Login</p>
          <ThemeToggle />
        </div>
        <div className='w-full'>
          <p className="text-sm font-medium text-base-content/70">Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-base-content/20 bg-base-200 text-base-content rounded-xl w-full p-2.5 mt-1 outline-none focus:border-primary' type="email" required />
        </div>
        <div className='w-full'>
          <p className="text-sm font-medium text-base-content/70">Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-base-content/20 bg-base-200 text-base-content rounded-xl w-full p-2.5 mt-1 outline-none focus:border-primary' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2.5 rounded-xl font-medium text-base mt-2 hover:opacity-90 transition'>Login</button>
        {
          state === 'Admin'
            ? <p className="text-xs text-base-content/70 mt-2">Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer font-semibold'>Click here</span></p>
            : <p className="text-xs text-base-content/70 mt-2">Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer font-semibold'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login

