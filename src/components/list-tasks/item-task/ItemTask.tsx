import { FC, useState } from "react"; 
import { Task } from "../../../types/types";
import { TaskCategory } from "./task-category/TaskCategory";
import { TaskComplete } from "./task-complete/TaskComplete";
import { TaskContent } from "./task-content/TaskContent";
import { TaskEdit } from "./task-edit/TaskEdit";
import { TaskMethods } from "./task-methods/TaskMethods";
import './task-item.scss';

interface ItemTaskProps {
    item: Task;
    removeTaskFromList: (id: string) => void;
    openInfoAboutTask: (id: string) => void;
    changeDataTask: (id: string, title?: string, description?: string) => void;
}

const ItemTask: FC<ItemTaskProps> = ({ 
    item, removeTaskFromList, changeDataTask, openInfoAboutTask
}) => {
    const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);
    const [showEditFields, setShowEditFields] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(item.title);
    const [editDescription, setEditDescription] = useState<string>(item.description);
    const [removeClassForTask, setRemoveClassForTask] = useState<boolean>(false);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(item.time));

    const editTitleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    }

    const editDescriptionTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditDescription(e.target.value);
    }

    const saveChangesEditingTask = () => {
        changeDataTask(item.id, editTitle, editDescription);
        setShowEditFields(false);
        setShowRemoveButton(false);
    }

    return (
        <div 
            className={!removeClassForTask ? "task" : "task-del"}
        >
            <TaskCategory item={item}/>
            <TaskComplete 
                item={item}
                changeDataTask={changeDataTask}/>

            {
                showEditFields ? 
                    <TaskEdit 
                        editTitle={editTitle} 
                        editTitleTask={editTitleTask} 
                        editDescription={editDescription}
                        editDescriptionTask={editDescriptionTask}/>
                :
                    <TaskContent item={item} openInfoAboutTask={openInfoAboutTask}/>
            }

            <TaskMethods 
                item={item}
                formattedDate={formattedDate}
                showEditFields={showEditFields}
                showRemoveButton={showRemoveButton} 
                setShowEditFields={setShowEditFields} 
                removeTaskFromList={removeTaskFromList}
                setShowRemoveButton={setShowRemoveButton} 
                setRemoveClassForTask={setRemoveClassForTask}
                saveChangesEditingTask={saveChangesEditingTask}/>  
        </div>
    )
}

export { ItemTask };