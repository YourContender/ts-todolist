import { FC } from "react";

interface TaskEditProps {
    editTitle: string;
    editDescription: string;
    editTitleTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editDescriptionTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskEdit: FC<TaskEditProps> = ({
    editTitle, editTitleTask, editDescription, editDescriptionTask
}) => {
    return (
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
    )
}

export { TaskEdit };