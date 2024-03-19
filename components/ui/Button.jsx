
const Button = ({ children=null, round=false, fullWidth=false, className='', circulaire=false, variant='default', type='bg', ...props }) => {
  var cls = 'btn'
  if (round) cls += ' round'
  else if (circulaire) cls += ' circle-button'

  if (fullWidth) cls += ' fullWidth'
  if (type == 'color') cls += ' without-bg'

  return (
      <button className={cls + ' ' + className + ' ' + variant + ' ' + variant + '-' + type + '-hover '} {...props}>{children}</button>
  )
}

export default Button