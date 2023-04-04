// import necessary dependencies //
import { useState, useEffect } from 'react'; 
import uniqid from "uniqid"
// import styling //
import styles from "./Todo.module.scss"
// import necessary components //
import List from "../components/List"
import Modal from "../components/Modal"

const Todo = () => {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            return JSON.parse(savedTasks)
        } else {
            return []
        }
    })
    const [isAddNew, setIsAddNew] = useState(false)
    const [isMoreThan100, setIsMoreThan100] = useState(false)
    const [isLessThan0, setIsLessThan0] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const setNewTask = (e) => {
        setTask({
            id: uniqid(),
            name: e.target.value,
            status: false
        });
    }

    const submitNewTask = (e) => {
        e.preventDefault()
        if (task.length <= 0 || task['name'].length <= 0) {
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

    const cancelNewTask = (e) => {
        setIsAddNew(false)
        setIsMoreThan100(false)
        setIsLessThan0(false)
        setTask("")
    }

    const finishTask = (id) => {
        tasks.map((task, i) => {
            if(task['id'] === id) {
                const newTask = [...tasks]
                newTask[i] = {
                    id: id,
                    name: newTask[i]['name'],
                    status: true
                }
                setTasks(newTask)
            }
        })
    }

    const deleteTask = (id) => {
        const taskDelete = tasks 
        const updateTask = taskDelete.filter((task) => task.id !== id)

        setTasks(updateTask)
    }

    const removeAllTasks = () => {
        setTasks([])
        setIsOpen(false)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return(
        <div className={styles.todo_wrapper}>  
            <div className={styles.todo_container}>
                <div className={styles.todo_up}>
                    <h3>Things you should be doing today...</h3>
                    <div className={styles.todo_up__options}>
                        {!isAddNew && ( 
                            <button onClick={() => setIsAddNew(!isAddNew)}>Add New</button>) 
                        }
                        <p onClick={() => setIsOpen(!isOpen)}>Clear</p>
                    </div>
                </div>
                
                <div className={styles.todo_addNewTask}>
                    {isAddNew && ( 
                    <>
                        <form onSubmit={submitNewTask}>
                            <textarea type="text" className='' onChange={(e) => setNewTask(e)} placeholder="Add new to-do title..." rows="2"/>
                            <div className={styles.todo_addNewTask__options}>
                                <p onClick={() => cancelNewTask()}>Cancel</p>
                                <button type='submit'>Create</button>
                            </div> 
                        </form>
                        {isMoreThan100 && !isLessThan0 && ( 
                            <p className={styles.warning}>Title must be shorter than equal to 100 characters.</p>
                        )}
                        {isLessThan0 && !isMoreThan100 && ( 
                            <p className={styles.warning}>Title must be longer than 0 character.</p>)
                        }
                    </>)}
                </div>
                
                {isOpen && (
                    <Modal tasks={tasks} removeAllTasks={removeAllTasks} closeModal={closeModal} />
                )}

                <List tasks={tasks} deleteTask={deleteTask} finishTask={finishTask}/>
            </div>
        </div>
    )
}

export default Todo