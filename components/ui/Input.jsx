import React from 'react'

const Input = ({ text, round, fullWidth, variant, ...props }) => {
    var cls = ''
    if (round) cls += ' round'
    if (fullWidth) cls += ' fullWidth'
    return (
        <div>
            <lable>{text}</lable>
            <input type="text" {...props} className={'inp ' + cls + ' ' + variant} />
        </div>
    )
}

export default Input