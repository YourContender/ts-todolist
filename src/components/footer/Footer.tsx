import { FC, useState } from "react";
import { Task } from "../../types/types";
import { TfiPlus } from "react-icons/tfi";
import "../../sass/footer/footer.scss"; 

interface FooterProps {
    listTasks: Task[];
    filteredTasks: Task[];
    showModalForm: boolean;
    filterListTasks: (filter: string) => void;
    setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: FC<FooterProps> = ({ 
    setShowModalForm, 
    listTasks, 
    showModalForm,
    filterListTasks 
}) => {
    const [startAnimation, setStartAnimation] = useState(false);

    const openModalWindow = () => {
        setStartAnimation(true);

        setTimeout(() => {
            setShowModalForm(true);
            setStartAnimation(false);
        }, 500)
    }

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
                    <p>done:</p> 
                    <span>{quantityCompleteTasks().complete}</span>    
                </div> 
            </div>
            <div className={startAnimation ? "footer_create spin" : "footer_create"}>
                <button onClick={openModalWindow}>
                    <TfiPlus />
                </button>
            </div>
        </div>
    )
}

export { Footer };
