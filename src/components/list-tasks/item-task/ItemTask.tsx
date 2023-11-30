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
import '../../../sass/list-tasks/Tasks-style.scss';

interface ItemTaskProps {
    item: Task;
    removeTaskFromList: (id: string) => void;
    toggleCompleteTask: (id: string) => void;
}

const ItemTask: FC<ItemTaskProps> = ({ 
    item, removeTaskFromList, toggleCompleteTask
}) => {
    const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(item.time));

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

            <div className="task_content">
                <div className="task_content-title">
                    <h1>{item.title}</h1>
                </div>
                <div className="task_content-descr">
                    <span>{item.description}</span>
                </div>
            </div>

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
                            <IoMdArrowBack />
                        </button>
    
                        <button className="task_methods-edit">
                            <TiEdit />
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