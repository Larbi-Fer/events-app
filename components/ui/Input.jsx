'use client'

import { useRef } from "react"

const Input = ({ text, round, fullWidth, variant, onChange, ...props }) => {
    var cls = ''
    if (fullWidth) cls += ' fullWidth'
    const ref = useRef()

    const change = e => {
        if(e.target.value === '') ref.current.classList.remove('selected')
        else ref.current.classList.add('selected')
        onChange(e)
    }

    return (
        <div ref={ref} className={'inp ' + cls + ' ' + variant}>
            <input type="text" {...props} required onChange={change} id={`id-${props.name}`} />
            <label for={`id-${props.name}`}>{text}</label>
        </div>
    )
}

export default Input