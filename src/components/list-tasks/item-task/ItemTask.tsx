import { FC, useState } from "react"; 
import { Task } from "../../../types/types";
import { TiEdit } from "react-icons/ti";
import { MdNightlife } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiDotsThreeOutline } from "react-icons/pi";
import '../../../sass/list-tasks/task/Tasks-style.scss';

interface ItemTaskProps {
    item: Task;
    removeTaskFromList: (id: string) => void;
    toggleCompleteTask: (id: string) => void;
    setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemTask: FC<ItemTaskProps> = ({ 
    item, removeTaskFromList, toggleCompleteTask, setShowModalEdit
}) => {
    const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);
    const [showEditFields, setShowEditFields] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(item.title);
    const [editDescription, setEditDescription] = useState<string>(item.description);

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

    return (
        <div className="task">
            <div className="task_category">
                {
                    item.category === 'home' ?
                        <IoHomeOutline className="task_category-home"/>
                    : item.category === 'life' ? 
                        <MdNightlife className="task_category-life"/>
                    : <BsPersonWorkspace className="task_category-work"/>
                }
            </div>

            <div>
                {
                    item.complete ?
                        <IoMdDoneAll 
                            className="task_checkbox done" 
                            onClick={() => toggleCompleteTask(item.id)}/> 
                        :  
                        <IoCheckmarkSharp 
                            className="task_checkbox progress" 
                            onClick={() => toggleCompleteTask(item.id)}/>   
                }
            </div>

            {
                showEditFields ? 
                    <div className="task_content">
                        <div className="task_content-title">
                            <input 
                                className="task_content-edit"
                                value={editTitle}  
                                onChange={editTitleTask}/>
                        </div>
                        <div className="task_content-descr">
                            <input 
                                className="task_content-edit"
                                value={editDescription}
                                onChange={editDescriptionTask}/>
                        </div>
                    </div> 
                :
                    <div className="task_content">
                        <div className="task_content-title">
                            <h1>{item.title}</h1>
                        </div>
                        <div className="task_content-descr">
                            <span>{item.description}</span>
                        </div>
                    </div>
            }

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
                                        onClick={() => setShowEditFields(false)}/>
                            }
                        </button>

                        <button
                            className="task_methods-remove"
                            onClick={() => removeTaskFromList(item.id)}
                        >
                            &times;
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export { ItemTask };