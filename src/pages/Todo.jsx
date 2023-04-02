// import necessary dependencies //
import { useState } from 'react'; 
import uniqid from "uniqid"
// import styling //
import styles from "./Todo.module.scss"
// import necessary components //
import List from "../components/List"

const Todo = () => {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [isAddNew, setIsAddNew] = useState(false)
    const [isMoreThan100, setIsMoreThan100] = useState(false)
    const [isLessThan0, setIsLessThan0] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const onSubmitNewTask = (e) => {
        e.preventDefault()
        if(task.length <= 0 || task['name'].length <= 0){
            setIsLessThan0(true)
            setIsMoreThan100(false)
        }
        else if(task['name'].length >= 100){
            setIsMoreThan100(true)
            setIsLessThan0(false)
        } 
        else {  
            setTasks([...tasks, task]) 
            setTask("")
            setIsAddNew(false)
            setIsMoreThan100(false)
            setIsLessThan0(false)
        }
    }

    const addNewTask = (e) => {
        setTask({
            id: uniqid(),
            name: e.target.value,
            status: false
        });
    }

    const cancelNewTask = (e) => {
        setIsAddNew(false)
        setIsMoreThan100(false)
        setIsLessThan0(false)
        setTask("")
    }

    const removeAllTasks = () => {
        setTasks([])
        setIsOpen(false)
    }

    return(
        <div className={styles.todo_wrapper}>  
            <div className={styles.todo_container}>
                <div className={styles.todo_up}>
                    <h3>Things you should be doing today...</h3>
                    <div className={styles.todo_up__options}>
                        {!isAddNew ? 
                            <button onClick={() => setIsAddNew(!isAddNew)}>Add New</button>:
                        <></> }
                        {/* <p onClick={() => setIsOpen(true)}>Clear</p> */}
                        <p onClick={() => setIsOpen(!isOpen)}>Clear</p>
                    </div>
                </div>

                {/* code for modal */}
                {isOpen && (
                    <>
                    {tasks.length ? 
                        <div className={styles.modal}>
                            <div className={styles.modal__content}>
                                <p>Confirm to clear all todos?</p>
                                <div className={styles.modal__content__confirmation}>
                                    <button className={styles.cancel} onClick={() => setIsOpen(false)}>Cancel</button>
                                    <button className={styles.confirm} onClick={() => removeAllTasks()}>Confirm</button>
                                </div>
                            </div>
                        </div>
                        : 
                        <div className={styles.modal}>
                            <div className={styles.modal__empty}>
                                <p>There is no todo item!</p>
                                <button className={styles.cancel} onClick={() => setIsOpen(false)}>Close</button>
                            </div>
                        </div>
                    }
                    </>
                )}
                
                <div className={styles.todo_addNewTask}>
                    {isAddNew ? 
                    <>
                        <form onSubmit={onSubmitNewTask} className={`text ${isAddNew ? 'visible' : ''}`}>
                            <textarea type="text" className='' onChange={(e) => addNewTask(e)} placeholder="Add new to-do title..." rows="2"/>
                            <div className={styles.todo_addNewTask__options}>
                                <p onClick={() => cancelNewTask()}>Cancel</p>
                                <button type='submit'>Create</button>
                            </div> 
                        </form>
                        {isMoreThan100 === true ? 
                            <p className={styles.warning}>Title must be shorter than equal to 100 characters.</p> : <></>
                        }
                        {isLessThan0 === true ? 
                            <p className={styles.warning}>Title must be longer than 0 character.</p> : <></>
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