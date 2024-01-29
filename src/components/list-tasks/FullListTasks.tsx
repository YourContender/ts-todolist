import { FC } from "react"; 
import { Task } from "../../types/types";
import { ItemTask } from "./item-task/ItemTask";
import { Footer } from "../footer/Footer";
import './list-tasks.scss';

interface ItemsTasksProps {
    listTasks: Task[];
    changeTheme: boolean;
    filteredTasks: Task[];
    showModalForm: boolean;
    removeTaskFromList: (id: string) => void;
    setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    openInfoAboutTask: (id: string) => void;
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const FullListTasks: FC<ItemsTasksProps> = ({ 
    listTasks, 
    changeTheme, 
    setListTasks,
    filteredTasks, 
    showModalForm,
    setFilteredTasks,
    setShowModalForm, 
    openInfoAboutTask,
    removeTaskFromList, 
}) => {
    const changeDataTask = async (id: string, title?: string, description?: string) => {
        let filtered = filteredTasks.map(item => {
            if (item.id === id) {
                return { 
                    title: title ? title : item.title,
                    description: description ? description : item.description,
                    id: item.id,
                    category: item.category,
                    complete: title && description ? item.complete : !item.complete,
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
            setFilteredTasks(filtered);
            setListTasks(filtered);
        }
    }

    const filterListTasks = (filter: string) => {
        console.log('work', filter)
        if (filter === 'complete') {
            setFilteredTasks([...listTasks].filter(item => item.complete));
        } else if (filter === 'process') {
            setFilteredTasks([...listTasks].filter(item => !item.complete));
        } else {
            setFilteredTasks([...listTasks]);
        }
    }

    return (
        <div className={changeTheme ? "tasks moon-bg" : "tasks"}>
            <div className="tasks_container">
                {
                    filteredTasks.map((item, i) => {
                        return <ItemTask 
                            key={i} 
                            item={item} 
                            removeTaskFromList={removeTaskFromList}
                            openInfoAboutTask={openInfoAboutTask}
                            changeDataTask={changeDataTask}
                        />
                    })
                }
            </div>

            <Footer 
                setShowModalForm={setShowModalForm} 
                listTasks={listTasks}
                filterListTasks={filterListTasks}
                filteredTasks={filteredTasks}
                showModalForm={showModalForm}
                setFilteredTasks={setFilteredTasks}/>
        </div>
    )
}

export { FullListTasks }