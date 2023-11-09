import { FC } from "react"; 
import { Task } from "../../../types/types";

interface ItemTaskProps {
    item: Task;
    toggleCompleteTask: (id: number) => void;
}

const ItemTask: FC<ItemTaskProps> = ({ item, toggleCompleteTask }) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(item.time);


    return (
        <div className="task">
            <input type="checkbox" checked={item.complete} onChange={() => toggleCompleteTask(item.id)}/>
            <div>
                <h1>{item.title}</h1>
                <span>{item.description}</span>
                <span>{formattedDate}</span>
            </div>

            <button>edit</button>
            <button>delete</button>
        </div>
    )
}

export { ItemTask };