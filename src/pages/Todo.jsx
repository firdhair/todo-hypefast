// import necessary dependencies //
import { useState } from 'react'; 
import uniqid from "uniqid"
import Modal from 'react-modal';
// import styling //
import styles from "./Todo.module.scss"
// import necessary components //
import List from "../components/List"
import Button from "../components/Button"

const Todo = () => {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [isAddNew, setIsAddNew] = useState(false)
    const [isMoreThan100, setIsMoreThan100] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    //const [isLessThan0, setIsLessThan0] = useState(false)

    const onSubmitTask = (e) => {
        e.preventDefault()
        console.log("length task", task['name'].length)
        if(task['name'].length > 100){
            setIsMoreThan100(true)
        } else {  
            setTasks([...tasks, task]) 
            setTask("")
            setIsAddNew(false)
            setIsMoreThan100(false)
        }
    }

    const handleChange = (e) => {
        setTask({
            id: uniqid(),
            name: e.target.value,
            status: false
        });
    }

    const removeAllTasks = () => {
        setTasks([])
    }

    // const openModal = () => {
    //     setIsOpen(true)
    // }

    // const closeModal = () => {
    //     setIsOpen(false)
    // }

    return(
        <div className={styles.todo_wrapper}>  
            <div className={styles.todo_container}>
                <div className={styles.todo_up}>
                    <h3>Things you should be doing today...</h3>
                    <div className={styles.todo_up__options}>
                        {!isAddNew ? 
                            // <Button addNew={isAddNew} setIsAddNew={setIsAddNew} name={"Add New"}/>: 
                            <button onClick={() => setIsAddNew(!isAddNew)}>Add New</button>:
                        <></> }
                        <p onClick={() => removeAllTasks()}>Clear</p>
                    </div>
                </div>
                {/* <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <h2>Modal Title</h2>
                    <p>Modal content goes here.</p>
                    <button onClick={closeModal}>Close Modal</button>
                </Modal> */}
                <div className={styles.todo_addNewTask}>
                    {isAddNew ? 
                    <>
                        <form onSubmit={onSubmitTask}>
                            <textarea type="text" className='' onChange={(e) => handleChange(e)} placeholder="Add new to-do title..." rows="2"/>
                            <div className={styles.todo_addNewTask__options}>
                                <p onClick={() => setIsAddNew(!isAddNew)}>Cancel</p>
                                <button type='submit'>Create</button>
                            </div> 
                        </form>
                        {isMoreThan100 === true ? 
                            <p className={styles.warning}>Title must be shorter than equal to 100 characters.</p> : <></>
                        }
                    </>
                    : <></>
                    }
                </div>
                {tasks.length ? 
                    <List tasks={tasks} setTasks={setTasks}/>
                    : <div className={styles.todo_bottom}>
                        <p>Nothing to-do yet.</p>
                    </div>
                    }
            </div>
        </div>
    )
}

export default Todo