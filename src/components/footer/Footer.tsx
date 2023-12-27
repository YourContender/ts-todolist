import { FC } from "react";
import { TfiPlus } from "react-icons/tfi";
import '../../sass/footer/Footer.scss'; 
import { Task } from "../../types/types";

interface FooterProps {
    listTasks: Task[];
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: FC<FooterProps> = ({ setShowModalForm, listTasks }) => {
    const quantityCompleteTasks = () => {
        let listComplete = [...listTasks].filter(item => item.complete);
        let progressTasks = [...listTasks].length - listComplete.length;

        return {
            all: listTasks.length,
            process: progressTasks,
            complete: listComplete.length
        };
    }
    return (
        <div className="tasks_data">
            <div className="tasks_data-result">  
                completed: <span>{quantityCompleteTasks().complete}</span> 
                process: <span>{quantityCompleteTasks().process}</span> 
                all: <span>{quantityCompleteTasks().all}</span> 
            </div>
            <div className="tasks_data-create">
                <button onClick={() => setShowModalForm(true)}>
                    <TfiPlus />
                </button>
            </div>
        </div>
    )
}

export { Footer };
