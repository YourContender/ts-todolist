import { FC, useState } from "react"; 
import { Task } from "../../../types/types";
import { IoHomeOutline } from "react-icons/io5";
import { MdNightlife } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
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
            <input 
                type="checkbox" 
                checked={item.complete} 
                onChange={() => toggleCompleteTask(item.id)}
                />
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
                        <div className="task_methods-date"
                            onClick={() => setShowRemoveButton(true)}
                        >
                            <span>{formattedDate}</span>
                        </div>
                    :
                    <div className="task_methods-remove"
                        onClick={() => setShowRemoveButton(false)}
                    >
                        <button
                            className="task_remove"
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