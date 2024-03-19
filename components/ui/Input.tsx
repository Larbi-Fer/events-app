'use client'

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { InputHTMLAttributes, useEffect, useRef } from "react"

type InputProps = {
    text?: string,
    round?: boolean,
    fullWidth?: boolean,
    variant?: 'default' | 'fill',
    onChange?: (e?: any) => void,
    multiLine?: boolean,
    inpRef?: any,
    required?: boolean,
    value?: string,
    name?: string,
    Icon?: ReactJSXElement,
    IconAsButton?: ReactJSXElement,
    loading?: boolean,
}

const Input = ({ text, round, fullWidth, variant='default', onChange, multiLine, inpRef, required, Icon, IconAsButton, className, loading=false, ...props } : InputProps & InputHTMLAttributes<HTMLInputElement>) => {
    const ref = useRef()

    var style : { paddingLeft?: string, paddingRight?: string } = {}
    var cls = ''
    if (fullWidth) cls += ' fullWidth'

    if (Icon) style.paddingLeft = '40px'
    if (IconAsButton) style.paddingRight = '40px'

    useEffect(() => {
      if (!ref.current) return
      if (props.value) ref.current.classList.add('selected')
    }, [])
    

    const change = e => {
        if(e.target.value == '') ref.current.classList.remove('selected')
        else ref.current.classList.add('selected')
        onChange && onChange(e)
    }
    

    return (
        <div ref={ref} className={'inp' + cls + (loading ? ' loading' : '') + ' ' + variant + ' ' + className}>
            { multiLine ?
                <textarea required={required} onChange={change} id={`id-${props.name}`}  ref={inpRef} {...props} style={style} /> :
                <input type="text" {...props} required={required} onChange={change} id={`id-${props.name}`}  ref={inpRef} className={round && 'round'} style={style} />
            }
            { IconAsButton && <div className="icon-btn">{IconAsButton}</div> }
            { Icon && <div className="icon">{Icon}</div> }
            { text ? <label htmlFor={`id-${props.name ?? text}`}>{text}</label> : null }
        </div>
    )
}

export default Input