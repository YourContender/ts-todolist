import { FC } from "react"; 
import { Task } from "../../types/types";
import { ItemTask } from "./item-task/ItemTask";
import '../../sass/list-tasks/ListTasks-style.scss';

interface ItemsTasksProps {
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>
    removeTaskFromList: (id: string) => void;
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>
}

const FullListTasks: FC<ItemsTasksProps> = ({ 
    listTasks, setShowModalForm, removeTaskFromList, setListTasks
}) => {

    const quantityCompleteTasks = () => {
        let listComplete = listTasks.filter(item => item.complete)

        return listComplete.length;
    }

    const toggleCompleteTask = async (id: string) => {
        let filtered = listTasks.map(item => {
            if (item.id === id) {
                return { 
                    title: item.title,
                    description: item.description,
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

        const res = await fetch(`https://654d3af877200d6ba85a2a97.mockapi.io/listTasks/${id}`, {
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
        <div className="tasks">
            {
                listTasks.map((item, i) => {
                    return <ItemTask 
                        key={i} 
                        item={item} 
                        removeTaskFromList={removeTaskFromList}
                        toggleCompleteTask={toggleCompleteTask}
                    />
                })
            }

            <div>
                completed: {quantityCompleteTasks()}
            </div>
            <div>
                <button onClick={() => setShowModalForm(true)}>add task</button>
            </div>
        </div>
    )
}

export { FullListTasks }