import { FC } from "react"; 
import { Task } from "../../../types/types";
import '../../../sass/list-tasks/Tasks-style.scss';

interface ItemTaskProps {
    item: Task;
    removeTaskFromList: (id: string) => void;
    toggleCompleteTask: (id: string) => void;
}

const ItemTask: FC<ItemTaskProps> = ({ 
    item, removeTaskFromList, toggleCompleteTask
}) => {
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
                        <img src='/category-img/home.png' alt="home" />
                    : item.category === 'life' ? 
                        <img src='/category-img/life.png' alt="life" />
                    : <img src='/category-img/work.png' alt="work" />
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
                <span>{formattedDate}</span>
                
                <button
                    className="task_remove"
                    onClick={() => removeTaskFromList(item.id)}
                >
                    &times;
                </button>
            </div>

        </div>
    )
}

export { ItemTask };