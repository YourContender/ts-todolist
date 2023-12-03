import React, { FC, useState, useMemo  } from "react";
import { Task } from "../../types/types";
import { v4 as uuidv4 } from 'uuid';
import "../../sass/forms/Form.scss"

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>
}

const Forms: FC<ItemsTasksProps> = ({ 
    setListTasks, listTasks, setShowModalForm
}) => {
    const initialStateTask: Task = {
        title: '',
        description: '',
        category: '',
        time: new Date(),
        complete: false,
        id: ''
    }

    const [task, setTask] = useState<Task>(initialStateTask);
    const [selectedCategory, setSelectedCategory] = useState<string>('life');

    const uuid: string = useMemo(() => uuidv4(), []);

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
        try {
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
        } catch (error) {
            console.error('Error adding task to database: ', error);
        }
        
    }

    return (
        <div className="forms">
            <div className="forms_container">
               <div className="forms_container-hide">
                    <button
                        onClick={() => setShowModalForm(false)}
                    >
                        &times;
                    </button>
               </div>
                <div className="forms_container-fields">
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
                    className="forms_container-create"
                >
                    add task
                </button>
            </div>
        </div>
    )
}

export { Forms };