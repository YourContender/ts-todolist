import { FC } from "react"
import { Task } from "../../../../types/types";
import { TiEdit } from "react-icons/ti";
import { IoMdArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { PiDotsThreeOutline } from "react-icons/pi";

interface TaskMethodProps {
    item: Task
    formattedDate: string;
    showEditFields: boolean;
    showRemoveButton: boolean;
    saveChangesEditingTask: () => void;
    removeTaskFromList: (id: string) => void;
    setShowRemoveButton: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditFields: React.Dispatch<React.SetStateAction<boolean>>; 
    setRemoveClassForTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskMethods: FC<TaskMethodProps> = ({ 
    item, 
    formattedDate, 
    showEditFields, 
    showRemoveButton, 
    setShowEditFields, 
    removeTaskFromList,
    setShowRemoveButton, 
    saveChangesEditingTask,
    setRemoveClassForTask
}) => {
    const removeTaskFromDatabase = () => {
        setRemoveClassForTask(true);
        
        setTimeout(() => {
            removeTaskFromList(item.id);
            setRemoveClassForTask(false);
        }, 500)
    }

    return (
        <div className="task_methods">
            {
                !showRemoveButton 
                ? 
                    <div className="task_methods-date">
                        <span>{formattedDate}</span>
                        <PiDotsThreeOutline 
                            className="task_methods-other" 
                            onClick={() => setShowRemoveButton(true)} />
                    </div>
                :
                <div className="task_methods-click">
                    <button className="task_methods-back"
                        onClick={() => setShowRemoveButton(false)}
                    >
                        <IoMdArrowBack 
                            onClick={() => setShowEditFields(false)}/>
                    </button>

                    <button className="task_methods-edit">
                        {
                            !showEditFields ?
                                <TiEdit 
                                    onClick={() => setShowEditFields(true)}/>
                            :
                                <IoCheckmarkSharp
                                    onClick={saveChangesEditingTask}/>
                        }
                    </button>

                    <button
                        className="task_methods-remove"
                        onClick={removeTaskFromDatabase}
                    >
                        &times;
                    </button>
                </div>
            }
        </div>
    )
}

export { TaskMethods }