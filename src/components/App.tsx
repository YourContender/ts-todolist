import { FC, useState } from "react";
import { Forms } from "./forms/Forms";
import { Task } from "../types/types";
import { FullListTasks } from "../components/list-tasks/FullListTasks";

const App: FC = () => {
    const [listTasks, setListTasks] = useState<Task[]>([{
        id: Date.now(),
        title: "name",
        description: "hello world",
        category: "home",
        time: new Date(),
        complete: false
    }]);

    const toggleCompleteTask = (id: number): void => {
        setListTasks(listTasks.map(item => {
            return item.id !== id ? item : {
                ...item,
                complete: !item.complete
            }
        }))
    }

	return (
        <div>
            <Forms 
                setListTasks={setListTasks} 
                listTasks={listTasks}/>
            <FullListTasks 
                setListTasks={setListTasks} 
                listTasks={listTasks} 
                toggleCompleteTask={toggleCompleteTask}/>
        </div>
    )
};

export default App;


