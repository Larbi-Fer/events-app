import React from 'react'

const Input = ({ text, round, fullWidth, ...props }) => {
    var cls = ''
    if (round) cls += ' round'
    if (fullWidth) cls += ' fullWidth'
    return (
        <div>
            <lable>{text}</lable>
            <input type="text" {...props} className={'inp ' + cls} />
        </div>
    )
}

export default Input