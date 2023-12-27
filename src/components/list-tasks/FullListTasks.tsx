import { FC } from "react"; 
import { Task } from "../../types/types";
import { ItemTask } from "./item-task/ItemTask";
import { Footer } from "../footer/Footer";
import '../../sass/list-tasks/list-tasks.scss';

interface ItemsTasksProps {
    listTasks: Task[];
    changeTheme: boolean;
    removeTaskFromList: (id: string) => void;
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const FullListTasks: FC<ItemsTasksProps> = ({ 
    listTasks, setShowModalForm, removeTaskFromList, setListTasks, changeTheme, 
}) => {
    const changeDataTask = async (id: string, title?: string, description?: string) => {
        let filtered = listTasks.map(item => {
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

            <Footer 
                setShowModalForm={setShowModalForm} 
                listTasks={listTasks}/>
        </div>
    )
}

export { FullListTasks }