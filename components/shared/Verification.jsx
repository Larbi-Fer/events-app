'use client'

import Input from "@components/ui/Input"
import Message from "@components/ui/Message"
import ErrorComp from "../ui/ErrorComp"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


const Verification = ({afterClose}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [code, setCode] = useState()
  const [err, setErr] = useState()
  const email = useSearchParams().get('email')

  const onSubmit = async e => {
    e.preventDefault()
    const data = (await (await fetch('/api/auth/verify', {
      body: JSON.stringify({ email, code }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })).json()).result

    if (data?.success) router.push('/login')
    else setErr(data?.message)
  }

  return (
    <Message title='Activate your account' show={pathname == '/verify'} onClose={() => router.push('/signup') || afterClose()} width='md' >
      <form onSubmit={onSubmit}>
        <h2 style={{textAlign: "center"}}>{email}</h2>
        <Input text="code" type='number' value={code} onChange={e => setCode(e.target.value)} />
        <ErrorComp>{err}</ErrorComp>
      </form>
    </Message>
  )
}

export default Verification