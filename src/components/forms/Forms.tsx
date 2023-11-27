import React, { FC, useState } from "react";
import { Task } from "../../types/types";
import { v4 as uuidv4 } from 'uuid';

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
    const [selectedCategory, setSelectedCategory] = useState<string>('life');

    const uuid: string = uuidv4();

    const changeCategoryTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    }

    const createTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,    
            [e.target.name]: e.target.value,
            time: new Date(),
            complete: false,
            id: uuid,
            category: selectedCategory
        })
    }

    const addTaskToDatabase = async () => {
        console.log('task: ', selectedCategory)
        const res = await fetch('http://localhost:3001/listTasks', {
            method: 'POST',
            body: JSON.stringify({
                ...task,
                category: selectedCategory
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
                <select 
                    name="category"
                    value={selectedCategory}
                    onChange={changeCategoryTask}
                >
                    <option value="home">home</option>
                    <option value="life">life</option>
                    <option value="work">work</option>
                </select>
                <input 
                    name="title"
                    type="text" 
                    placeholder="enter title"
                    onChange={createTask}
                    // disabled={true}
                />
                <input 
                    name="description"
                    type="text"
                    placeholder="enter description"
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