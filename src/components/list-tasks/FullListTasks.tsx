import { FC, useState } from "react"; 
import { Task } from "../../types/types";
import { ItemTask } from "./item-task/ItemTask";
import { TfiPlus } from "react-icons/tfi";
import '../../sass/list-tasks/ListTasks-style.scss';

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    removeTaskFromList: (id: string) => void;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
    changeTheme: boolean;
}

const FullListTasks: FC<ItemsTasksProps> = ({ 
    listTasks, setShowModalForm, removeTaskFromList, setListTasks, changeTheme
}) => {
    const quantityCompleteTasks = () => {
        let listComplete = listTasks.filter(item => item.complete)

        return listComplete.length;
    }

    const changeDataTask = async (id: string, title?: string, description?: string) => {
        let filtered = listTasks.map(item => {
            if (item.id === id) {
                return { 
                    title: title ? title : item.title,
                    description: description ? description : item.description,
                    id: item.id,
                    category: item.category,
                    complete: !item.complete,
                    time: item.time
                }
            }

            return item;
        })

        let data = filtered.filter(item => item.id === id);
        console.log('filtered: ', data[0]);

        const res = await fetch(`http://localhost:3001/listTasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data[0]),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            setListTasks(filtered);
        }

    }
    return (
        <div className={changeTheme ? "tasks moon-bg" : "tasks"}>
            <div className="tasks_container">
                {
                    listTasks.map((item, i) => {
                        return <ItemTask 
                            key={i} 
                            item={item} 
                            removeTaskFromList={removeTaskFromList}
                            changeDataTask={changeDataTask}
                        />
                    })
                }
            </div>

            <div className="tasks_data">
                <div className="tasks_data-result">  
                    completed: <span>{quantityCompleteTasks()}</span> 
                </div>
                <div className="tasks_data-create">
                    <button onClick={() => setShowModalForm(true)}>
                        <TfiPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { FullListTasks }