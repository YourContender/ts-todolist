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

    const addTaskToDatabase = async () => {
        const res = await fetch('https://654d3af877200d6ba85a2a97.mockapi.io/listTasks', {
            method: 'POST',
            body: JSON.stringify({
                ...task
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 201) {
            setListTasks([...listTasks, task]);
        }
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
                onClick={() => addTaskToDatabase()} 
                className="forms_btn"
            >
                add task
            </button>
        </div>
    )
}

export { Forms };