'use client'

import React, { useEffect, useRef, useState } from "react"
import Button from "./Button"

const Message = ({ show, onClose, title, children, width } = { width: String, show: String, onClose: () => null, title: String, children: React.Component }) => {
    const boxRef = useRef()
    const msgRef = useRef()
    const allRef = useRef()
    const [s, setS] = useState(show)

    useEffect(() => {
        if(show) {
            allRef.current.classList.remove('hidden');
            setTimeout(() => {
                boxRef.current.classList.add('blur')
                msgRef.current.classList.add('start')
            }, 10)
        } else {
            boxRef.current?.classList.remove('blur')
            msgRef.current?.classList.remove('start')
            setTimeout(() => allRef.current.classList.add('hidden'), 300)
        }
    }, [show])

    useEffect(() => {
    }, [s])

    return (
        <div ref={allRef} className="hidden">
            <div ref={boxRef} className="back-box" onClick={onClose}></div>
            <div ref={msgRef} className={"msg " + width}>
                <header>
                    {title}
                </header>
                <div>
                    {children}
                </div>
                <footer>
                    <Button>OK</Button>
                    <Button onClick={onClose}>CANCEL</Button>
                </footer>
            </div>
        </div>
    )
}

export default Message