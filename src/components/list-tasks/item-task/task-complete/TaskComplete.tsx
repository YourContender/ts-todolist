import { FC } from "react";
import { Task } from "../../../../types/types";
import { IoMdDoneAll } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";

interface TaskCompleteProps {
    changeDataTask: (id: string) => void;
    item: Task
}

const TaskComplete: FC<TaskCompleteProps> = ({ changeDataTask, item }) => {
    return (
        <div>
            {
                item.complete ?
                    <IoMdDoneAll 
                        className="task_checkbox done" 
                        onClick={() => changeDataTask(item.id)}/> 
                    :  
                    <IoCheckmarkSharp 
                        className="task_checkbox progress" 
                        onClick={() => changeDataTask(item.id)}/>   
            }
        </div>
    )
}

export { TaskComplete }