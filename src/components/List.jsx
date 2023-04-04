// import styling //
import styles from "./List.module.scss"
// import necessary media //
import { ReactComponent as CheckCircle } from "../media/icons/CheckCircle.svg"
import { ReactComponent as MinusCircle } from "../media/icons/MinusCircle.svg"

const List = ({tasks, finishTask, deleteTask}) => {
  return (
    <>
        <ul>
          {!tasks.length ? 
            <div className={styles.todo_bottom}>
                <p>Nothing to-do yet.</p>
            </div>
            : 
            <>
              {tasks.map((task) => (
                <>
                  {!task['status'] && ( 
                  <div className={styles.task} key={task['id']}>
                      <li className={styles.task__info}>
                        <div className={styles.task__info__checklist}>
                          <CheckCircle className={styles.task__info__check} onClick={(e) => finishTask(task['id'])} style={{fill: "#f5f5f4"}}/>
                          <p> {task['name']}</p>
                        </div>
                        <div className={styles.task__info__removelist}>
                          <MinusCircle className={styles.task__info__remove} onClick={(e) => deleteTask(task['id'])}/>
                        </div>
                      </li>
                  </div>)}
                </>
              ))}
              {tasks.map((task, i) => (
                <>
                  {task['status'] && (     
                  <div className={styles.task} key={task['id']}>
                      <li className={styles.task__info} style={{opacity: 0.5}}>
                        <div className={styles.task__info__checklist}>
                          <CheckCircle className={styles.task__info__check} onClick={(e) => finishTask(task['id'])} style={{fill: "#059669"}}/>
                          <p> {task['name']}</p>
                        </div>
                        <div className={styles.task__info__removelist}>
                          <MinusCircle className={styles.task__info__remove} onClick={(e) => deleteTask(task['id'])}/>
                        </div>
                      </li>
                  </div>
                  )}
                </>
              ))}
            </>
          }
        </ul>
    </>
  );
};
export default List;
