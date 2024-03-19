'use client'

import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from "react"
import Button from "./Button"

// buttons: { text, onClick, props }
const Message = ({ show, onClose, title, children, width, buttons } : { width: 'sm' | 'md' | 'lg' | 'xl', show: boolean, onClose: () => any, title: string, children?: React.ReactNode, buttons?: ({ text: string } & ButtonHTMLAttributes<HTMLButtonElement>)[] }) => {
    const boxRef = useRef()
    const msgRef = useRef()
    const allRef = useRef()

    useEffect(() => {
        if(show) {
            // Show the box
            allRef.current.classList.remove('hidden');
            // Smooth effect
            setTimeout(() => {
                boxRef.current.classList.add('blur')
                msgRef.current.classList.add('start')
            }, 10)
        } else {
            boxRef.current?.classList.remove('blur')
            msgRef.current?.classList.remove('start')
            setTimeout(() => allRef.current?.classList.add('hidden'), 300)
        }
    }, [show])

    return (
        <div ref={allRef} className="hidden">
            <div ref={boxRef} className="back-box" onClick={onClose}></div>
            <div ref={msgRef} className={"msg " + width}>
                <div className="header">
                    {title}
                </div>
                <div className="content">
                    {children}
                </div>
                <div className="footer">
                    { buttons?.map(btn => (
                        <Button {...btn} onClick={btn.onClick}>{btn.text}</Button>
                    )) }
                    <Button onClick={onClose}>CANCEL</Button>
                </div>
            </div>
        </div>
    )
}

export default Message