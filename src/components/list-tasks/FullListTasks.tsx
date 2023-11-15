import { FC } from "react"; 
import { Task } from "../../types/types";
import { ItemTask } from "./item-task/ItemTask";

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>
    toggleCompleteTask: (id: string) => void;
    removeTaskFromList: (id: string) => void;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>
}

const FullListTasks: FC<ItemsTasksProps> = ({ 
    listTasks, setShowModalForm, toggleCompleteTask, removeTaskFromList
}) => {
    return (
        <div>
            {
                listTasks.map((item, i) => {
                    return <ItemTask 
                        key={i} 
                        item={item} 
                        toggleCompleteTask={toggleCompleteTask}
                        removeTaskFromList={removeTaskFromList}
                    />
                })
            }

            <div>
                completed: 5
            </div>
            <div>
                <button onClick={() => setShowModalForm(true)}>add task</button>
            </div>
        </div>
    )
}

export { FullListTasks }