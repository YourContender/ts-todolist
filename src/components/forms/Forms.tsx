import React, { FC, useState, useMemo  } from "react";
import { v4 as uuidv4 } from 'uuid';
import { API } from '../../services/api'
import { Task } from "../../types/types";
import { FormsView } from "./FormsView";
import "../../sass/forms/Form.scss"

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Forms: FC<ItemsTasksProps> = ({ 
    setListTasks, listTasks, setShowModalForm
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('life');

    const uuid: string = useMemo(() => uuidv4(), []);

    const changeCategoryTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    }

    const addTaskToDatabase = async (values: any) => {
        let taskCurr = {
            title: values.title,
            description: values.description,
            time: new Date(),
            complete: false,
            id: uuid,
            category: selectedCategory
        }

        try {
            const res = await fetch(API, {
                method: 'POST',
                body: JSON.stringify({
                    ...taskCurr
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (res.status === 201) {
                setListTasks([...listTasks, taskCurr]);
                setShowModalForm(false);
            }
        } catch (error) {
            console.error('Error adding task to database: ', error);
        }
    }

    return (
        <FormsView
            setShowModalForm={setShowModalForm}
            selectedCategory={selectedCategory}
            changeCategoryTask={changeCategoryTask}
            addTaskToDatabase={addTaskToDatabase}/>
    )
}

export { Forms };