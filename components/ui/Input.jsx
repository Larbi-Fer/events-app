'use client'

import { useRef } from "react"

const Input = ({ text, round, fullWidth, variant, onChange, multiLine, inpRef, required, ...props }) => {
    const ref = useRef()

    var cls = ''
    if (fullWidth) cls += ' fullWidth'

    const change = e => {
        if(e.target.value === '') ref.current.classList.remove('selected')
        else ref.current.classList.add('selected')
        onChange(e)
    }
    

    return (
        <div ref={ref} className={'inp ' + cls + ' ' + variant}>
            { multiLine ?
                <textarea required={required} onChange={change} id={`id-${props.name}`}  ref={inpRef} /> :
                <input type="text" {...props} required={required} onChange={change} id={`id-${props.name}`}  ref={inpRef} />
            }
            <label for={`id-${props.name}`}>{text}</label>
        </div>
    )
}

export default Input