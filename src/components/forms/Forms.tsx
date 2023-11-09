import React, { FC, useState } from "react";
import { Task } from "../../types/types";

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const initialStateTask = {
    id: Date.now(),
    title: '',
    description: '',
    category: '',
    time: new Date(),
    complete: false
}

const Forms: FC<ItemsTasksProps> = ({ setListTasks, listTasks }) => {
    const [task, setTask] = useState<Task>(initialStateTask);

    const createTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,    
            [e.target.name]: e.target.value,
            time: new Date(),
            complete: false,
            id: Date.now()
        })
    }

    const addTaskToList = () => {  
        setListTasks([...listTasks, task]);
    }

    return (
        <div className="forms">
            <div className="forms_fields">
                <input 
                    name="title"
                    type="text" 
                    placeholder="enter title"
                    onChange={createTask}
                />
                <input 
                    name="description"
                    type="text"
                    placeholder="enter description"
                    onChange={createTask}
                />
                <input 
                    name="category"
                    type="text" 
                    placeholder="enter category"
                    onChange={createTask}
                />
            </div>

            <button 
                onClick={() => addTaskToList()} 
                className="forms_btn"
            >
                add task
            </button>
        </div>
    )
}

export { Forms };