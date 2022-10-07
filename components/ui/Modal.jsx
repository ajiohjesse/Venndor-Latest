import styles from '../../styles/ui/Modal.module.css'

const Modal = ({ children, ...props }) => {
  return (
    <div className={styles.modal} {...props}>
      {children}
    </div>
  )
}

export default Modal
