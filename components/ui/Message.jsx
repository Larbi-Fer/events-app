'use client'

import { useEffect, useRef, useState } from "react"
import Button from "./Button"

const Message = ({ show, onClose, title, children, width }) => {
    const boxRef = useRef()
    const msgRef = useRef()
    const [s, setS] = useState(show)

    const close = () => setS(false) || setTimeout(() => onClose(), 300);

    useEffect(() => {
      setS(show)
    }, [show])

    useEffect(() => {
        if (s) setTimeout(() => {
            boxRef.current.classList.add('blur')
            msgRef.current.classList.add('start')
        }, 0)
        else setTimeout(() => {
            boxRef.current?.classList.remove('blur')
            msgRef.current?.classList.remove('start')
        }, 0)
    }, [s])

    return (
        show ?
            <>
                <div ref={boxRef} className="back-box" onClick={() => close()}></div>
                <div ref={msgRef} className={"msg " + width}>
                    <header>
                        {title}
                    </header>
                    <div>
                        {children}
                    </div>
                    <footer>
                        <Button onClick={() => boxRef.current.classList.remove('test2')}>OK</Button>
                        <Button onClick={() => close()}>CANCEL</Button>
                    </footer>
                </div>
            </>
        : null
    )
}

export default Message