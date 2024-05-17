'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react"

import Input from "@components/ui/Input"
import Message from "@components/ui/Message"
import Toast from "@components/ui/Toast"

const Verification = ({afterClose}) => {
  const pathname = usePathname()
  const router = useRouter()
  const email = useSearchParams().get('email')
  const ref = useRef<HTMLDivElement>(null)

  const [code, setCode] = useState()
  const [msg, setMsg] = useState()

  const onSubmit = async e => {
    e.preventDefault()
    if(!code) {
      ref.current?.classList.add('vibration')
      setTimeout(() => ref.current?.classList.remove('vibration'), 500)
      return
    }
    const data = (await (await fetch('/api/auth/verify', {
      body: JSON.stringify({ email, code }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })).json()).result
    console.log(data);

    if (!data?.success) return setMsg(data?.message)
    afterClose() // clear the password field
    router.push('/login')
  }

  return (
    <Message title='Activate your account' show={pathname == '/verify'} onClose={() => router.push('/signup') || afterClose()} width='md' buttons={[{ text: 'VALIDATE', onClick: onSubmit }]} >
      <form ref={ref} onSubmit={onSubmit}>
        <h2 style={{textAlign: "center"}}>{email}</h2>
        <Input name='code' text="code" type='number' value={code} onChange={e => setCode(e.target.value)} variant='fill' fullWidth />
        <Toast show={msg!=''} text={msg} after={() => setMsg('')} type='error' />
      </form>
    </Message>
  )
}

export default Verification