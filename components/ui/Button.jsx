import React from 'react'

const Button = ({ children, round, fullWidth, ...props }) => {
  var cls = 'btn'
  if (round) cls += ' round'
  if (fullWidth) cls += ' fullWidth'
  return (
    <>
      <button className={cls} {...props}>{children}</button>
    </>
  )
}

export default Button