// eslint-disable-next-line react/display-name

import { forwardRef } from 'react'
import styles from '../../styles/ui/Button.module.css'

const Button = forwardRef(({ children, color = 'primary', ...others }, ref) => {
  return (
    <button
      ref={ref}
      className={[styles.btn, styles[color]].join(' ')}
      {...others}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
