import styles from '../../styles/ui/Input.module.css'

const Input = ({
  type = 'text',
  label = '',
  msg = '',
  error = false,
  ...props
}) => {
  return (
    <div className={styles.container}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input
        autoComplete="new-password"
        type={type}
        className={
          error ? [styles.input, styles.error].join(' ') : styles.input
        }
        {...props}
      />
      {msg ? <p className={styles.msg}>{msg}</p> : null}
    </div>
  )
}

export default Input
