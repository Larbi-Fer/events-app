'use client'

import Input from "@components/ui/Input"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useState } from "react"
import '@styles/auth.css'
import Button from "@components/ui/Button"

const flds = {
  email: '',
  username: '',
  password: ''
}

const AuthFrom = () => {
  const pathname = usePathname()
  const [fields, setFields] = useState(flds)
  const isSignup = pathname == '/signup'

  const onChange = e => {
    setFields(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(fields)
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>{ isSignup ? 'Create account' : 'Login to continue' }</h2>
      <Input name='email' text='Email' type='email' fullWidth onChange={onChange} value={fields.email} variant='fill' round/>
      {isSignup && <Input name='username' text='Username' fullWidth onChange={onChange} value={fields.username} variant='fill' round/>}
      <Input name='password' text='Password' type='password' fullWidth onChange={onChange} value={fields.password}  variant='fill' round/>

      <Button fullWidth round>{isSignup ? 'SIGN UP' : 'LOGIN'}</Button>
    </form>
  )
}

export default AuthFrom