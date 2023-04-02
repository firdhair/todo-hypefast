import { useState } from 'react'; 
import styles from "./List.module.scss"
import { ReactComponent as CheckCircle } from "../media/icons/CheckCircle.svg"
import { ReactComponent as MinusCircle } from "../media/icons/MinusCircle.svg"

const List = ({tasks, setTasks}) => {
  const [color, setColor] = useState("#F5F5F4")
  const [opacity, setOpacity] = useState(1)

  const finishTask = (id) => {
    setColor('#059669')
    setOpacity(0.5)

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

  console.log("tasks", tasks)
  return (
    <>
        <ul>
          {tasks.map((task) => (
            <>
              {!task['status'] ? 
              <div className={styles.task}>
                  <li key={task['id']} className={styles.task__info}>
                    <div className={styles.task__info__checklist}>
                      <CheckCircle className={styles.task__info__check} onClick={(e) => finishTask(task['id'])} style={{fill: "#f5f5f4"}}/>
                      <p> {task['name']} {task['status']}</p>
                    </div>
                    <MinusCircle className={styles.task__info__remove} onClick={(e) => deleteTask(task['id'])}/>
                  </li>
              </div>
              : <></>}
            </>
          ))}
          {tasks.map((task) => (
            <>
              {task['status'] ?      
              <div className={styles.task}>
                  <li key={task['id']} className={styles.task__info} style={{opacity: task['status'] ? 0.5 : 1}}>
                    <div className={styles.task__info__checklist}>
                      <CheckCircle className={styles.task__info__check} onClick={(e) => finishTask(task['id'])} style={{fill: task['status'] ? "#059669" : "#f5f5f4"}}/>
                      <p> {task['name']} {task['status']}</p>
                    </div>
                    <MinusCircle className={styles.task__info__remove} onClick={(e) => deleteTask(task['id'])}/>
                  </li>
              </div>
              : <></>}
            </>
          ))}
        </ul>
    </>
  );
};
export default List;
