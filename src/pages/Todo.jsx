// import necessary dependencies //
import { useState } from 'react'; 
import uniqid from "uniqid"
// import styling //
import styles from "./Todo.module.scss"
// import necessary components //
import List from "../components/List"
import Button from "../components/Button"

const Todo = () => {
    const [isAddNew, setIsAddNew] = useState(false)
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])

    const onSubmitTask = (e) => {
        e.preventDefault()
        setTasks([...tasks, task]) 
        setTask("")
        setIsAddNew(false)
    }

    const handleChange = (e) => {
        setTask({
            id: uniqid(),
            name: e.target.value,
            status: false
        });
    };

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
                        <p>Clear</p>
                    </div>
                </div>
                <div className={styles.todo_addNewTask}>
                    {isAddNew ? 
                    <form onSubmit={onSubmitTask}>
                        <input type="text" className='' onChange={(e) => handleChange(e)} placeholder="Add new to-do title..."/>
                        <div className={styles.todo_addNewTask__options}>
                            <p onClick={() => setIsAddNew(!isAddNew)}>Cancel</p>
                            <button type='submit'>Create</button>
                        </div> 
                    </form>
                    : <></>
                    }
                </div>
                {tasks.length ? 
                    <List tasks={tasks}/>
                    : <div className={styles.todo_bottom}>
                        <p>Nothing to-do yet.</p>
                    </div>
                    }
            </div>
        </div>
    )
}

export default Todo