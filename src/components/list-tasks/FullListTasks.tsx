import { FC } from "react"; 
import { Task } from "../../types/types";
import { ItemTask } from "./item-task/ItemTask";

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>
    toggleCompleteTask: (id: number) => void;
}


const FullListTasks: FC<ItemsTasksProps> = ({ listTasks, toggleCompleteTask }) => {
    return (
        <div>
            {
                listTasks.map(item => {
                    return <ItemTask key={item.id} item={item} toggleCompleteTask={toggleCompleteTask}/>
                })
            }
        </div>
    )
}

export { FullListTasks }