import React, { FC, useState } from "react";
import { Task } from "../../types/types";

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>
}

const Forms: FC<ItemsTasksProps> = ({ 
    setListTasks, listTasks, setShowModalForm
}) => {
    const initialStateTask = {
        title: '',
        description: '',
        category: '',
        time: new Date(),
        complete: false,
        id: ''
    }

    const [task, setTask] = useState<Task>(initialStateTask);

    const nextIdForTask: string  =  listTasks.length > 0 ? String(listTasks.length + 1) : "1";

    const createTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,    
            [e.target.name]: e.target.value,
            time: new Date(),
            complete: false,
            id: nextIdForTask
        })
    }

    const addTaskToDatabase = async () => {
        console.log('task: ', task)
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
            <button
                onClick={() => setShowModalForm(false)}
            >
                &times;
            </button>
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