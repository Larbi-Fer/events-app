import React from 'react'

const Button = ({ children, round, fullWidth, ...props }) => {
  var cls = 'btn'
  var cls = ''
  if (round) cls += ' round'
  if (fullWidth) cls += ' fullWidth'
  return (
    <>
      <button className={'btn ' + cls} {...props}>{children}</button>
    </>
  )
}

export default Button