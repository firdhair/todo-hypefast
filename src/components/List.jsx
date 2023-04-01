import styles from "./List.module.scss"
import { ReactComponent as CheckCircle } from "../media/icons/CheckCircle.svg"
import { ReactComponent as MinusCircle } from "../media/icons/MinusCircle.svg"

const List = ({tasks, setTasks}) => {
  //console.log("list tasks", tasks)
  const deleteTask = (id) => {
    console.log("id", id)

    const taskDelete = tasks 
    const updateTask = taskDelete.filter((task) => task.id !== id)

    setTasks(updateTask)
  }

  return (
        <ul>
          {tasks.map((task) => (
           <div className={styles.task}>
              <li key={task['id']} className={styles.task__info}>
                <div className={styles.task__info__checklist}>
                  <CheckCircle className={styles.task__info__check}/>
                  <p> {task['name']} </p>
                </div>
                <MinusCircle className={styles.task__info__remove} onClick={(e) => deleteTask(task['id'])}/>
              </li>
           </div>
          ))}
        </ul>
  );
};
export default List;
