import { FC } from "react";
import { Task } from "../../../../types/types";

interface TaskContentProps {
    item: Task
}

const TaskContent: FC<TaskContentProps> = ({ item }) => {
    return (
        <div className="task_content">
            <div className="task_content-title">
                <h1>{item.title}</h1>
            </div>
            <div className="task_content-descr">
                <span>{item.description}</span>
            </div>
        </div>
    )
}

export { TaskContent };