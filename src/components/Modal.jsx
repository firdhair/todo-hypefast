// import styling //
import styles from "./Modal.module.scss"

const Modal = ({tasks, removeAllTasks, closeModal}) => {
    return(
        <>
            {tasks.length ? 
                <div className={styles.modal}>
                    <div className={styles.modal__content}>
                        <p>Confirm to clear all todos?</p>
                        <div className={styles.modal__content__confirmation}>
                            <button className={styles.cancel} onClick={() => closeModal()}>Cancel</button>
                            <button className={styles.confirm} onClick={() => removeAllTasks()}>Confirm</button>
                        </div>
                    </div>
                </div>
                : 
                <div className={styles.modal}>
                    <div className={styles.modal__empty}>
                        <p>There is no todo item!</p>
                        <button className={styles.cancel} onClick={() => closeModal()}>Close</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal