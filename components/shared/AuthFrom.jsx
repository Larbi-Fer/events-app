'use client'
import '@styles/auth.css'

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { signIn, useSession } from "next-auth/react"

import Input from "@components/ui/Input"
import Button from "@components/ui/Button"
import Toast from "@components/ui/Toast"
import Verification from "./Verification"

import code from '@utils/decode'

const flds = {
  email: '',
  username: '',
  password: ''
}

const AuthFrom = () => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  const [fields, setFields] = useState(flds)
  const [msg, setMsg] = useState('')

  const isLogin = pathname == '/login'

  useEffect(() => {
    if (session.status == "authenticated") router.push('/home') || setMsg('You are now logged in')
  }, [session])
  

  const onChange = e => {
    setFields(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    if(isLogin) {
      const res = await signIn('credentials', { email: fields.email, password: fields.password, redirect: false })
      if (res?.error) return setMsg(code.auth[res.error])
      router.push('/home')
    } else {
      const data = await (await fetch('/api/auth/signup', {
        body: JSON.stringify(fields),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })).json()
      setMsg(data.message)
      if (data.success) return router.push(`/verify?email=${fields.email}`)
    }
  }

  return (
    <>
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>{ !isLogin ? 'Create account' : 'Login to continue' }</h2>
        <Input name='email' text='Email' type='email' fullWidth onChange={onChange} value={fields.email} variant='fill'/>
        {!isLogin && <Input name='username' text='Username' fullWidth onChange={onChange} value={fields.username} variant='fill'/>}
        <Input name='password' text='Password' type='password' fullWidth onChange={onChange} value={fields.password}  variant='fill'/>

        <Button fullWidth round>{isLogin ? 'LOGIN' : 'SIGN UP'}</Button>

        <Toast show={msg != ''} text={msg} type='error' after={() => setMsg('')} />
      </form>
      <Verification afterClose={() => setFields(f => ({...f, password: ''}))} />
    </>
  )
}

export default AuthFrom