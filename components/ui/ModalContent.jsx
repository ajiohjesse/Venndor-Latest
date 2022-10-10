import styles from '../../styles/ui/Modal.module.css'

const ModalContent = ({ children, ...props }) => {
  return (
    <div className={styles.modal} {...props}>
      <div className={styles.modalContentWrapper}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}

export default ModalContent
