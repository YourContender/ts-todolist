import { FC } from "react";
import { Task } from "../../types/types";
import { TfiPlus } from "react-icons/tfi";
import "../../sass/footer/footer.scss"; 

interface FooterProps {
    listTasks: Task[];
    filteredTasks: Task[];
    filterListTasks: (filter: string) => void;
    setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: FC<FooterProps> = ({ 
    setShowModalForm, 
    listTasks, 
    filterListTasks 
}) => {
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
        <div className="footer">
            <div className="footer_container">  
                <div className="footer_container-item" onClick={() => filterListTasks('all')}>
                    <p>all:</p> 
                        <span>{quantityCompleteTasks().all}</span>    
                </div> 
                <div className="footer_container-item" onClick={() => filterListTasks('process')}>
                    <p>process:</p> 
                    <span>{quantityCompleteTasks().process}</span>    
                </div> 
                <div className="footer_container-item" onClick={() => filterListTasks('complete')}>
                    <p>completed:</p> 
                    <span>{quantityCompleteTasks().complete}</span>    
                </div> 
            </div>
            <div className="footer_create">
                <button onClick={() => setShowModalForm(true)}>
                    <TfiPlus />
                </button>
            </div>
        </div>
    )
}

export { Footer };
