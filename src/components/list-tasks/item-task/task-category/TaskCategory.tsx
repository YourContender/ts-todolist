import { IoHomeOutline } from "react-icons/io5";
import { MdNightlife } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { FC } from "react";
import { Task } from "../../../../types/types";

interface TaskCategoryProps {
    item: Task
}

const TaskCategory: FC<TaskCategoryProps> = ({ item }) => {
    return (
        <div className="task_category">
            {
                item.category === 'home' ?
                    <IoHomeOutline className="task_category-home"/>
                : item.category === 'life' ? 
                    <MdNightlife className="task_category-life"/>
                : <BsPersonWorkspace className="task_category-work"/>
            } 
        </div>
    )
}

export { TaskCategory };