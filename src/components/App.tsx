import { FC, useEffect, useState } from "react";
import { Forms } from "./forms/Forms";
import { Task } from "../types/types";
import { FullListTasks } from "../components/list-tasks/FullListTasks";
import { Header } from "./header/Header";

const App: FC = () => {
    const [listTasks, setListTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [showModalForm, setShowModalForm] = useState<boolean>(false);
    const [changeTheme, setChangeTheme] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3001/listTasks');
                const body: Task[] = await res.json();
                setListTasks(body);
                setFilteredTasks(body);
            } catch {
                console.log('error')
            }
        } 
        fetchData();
    }, []);
        
    const removeTaskFromList = async (id: string) => {
        let filtered = listTasks.filter(item => {
            return item.id !== id
        });
        let API = 'http://localhost:3001/listTasks';

        const res = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });

        if (res.status === 200) {
            setFilteredTasks(filtered);
        }
    }

	return (
        <div>
            <Header 
                listTasks={listTasks}
                setChangeTheme={setChangeTheme}
                changeTheme={changeTheme}/>
            {
                showModalForm ? 
                    <Forms 
                        setListTasks={setListTasks} 
                        listTasks={listTasks}
                        setFilteredTasks={setFilteredTasks}
                        setShowModalForm={setShowModalForm}/>
                : null
            }
            <FullListTasks 
                changeTheme={changeTheme}
                setListTasks={setListTasks} 
                listTasks={listTasks} 
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
                setShowModalForm={setShowModalForm}
                removeTaskFromList={removeTaskFromList}/>
        </div>
    )
};

export default App;


