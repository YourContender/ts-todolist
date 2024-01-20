import { FC } from "react";
import { Task } from "../../../../types/types";

interface TaskContentProps {
    item: Task,
    openInfoAboutTask: (id: string) => void;
}

const TaskContent: FC<TaskContentProps> = ({ item, openInfoAboutTask }) => {
    return (
        <div className="task_content"
            onClick={() => openInfoAboutTask(item.id)}
        >
            <div className="task_content-title">
                <h1>
                    {
                        item.title.length > 12 ? 
                            item.title.slice(0, 12) + '...' 
                        : item.title
                    }
                </h1>
            </div>
            <div className="task_content-descr">
                <span>
                    {
                        item.description.length > 12 ? 
                            item.description.slice(0, 12) + '...' 
                        : item.description
                    }
                </span>
            </div>
        </div>
    )
}

export { TaskContent };