import { FC, useEffect, useState } from "react";
import { Forms } from "./components/forms/Forms";
import { Task } from "./types/types";
import { FullListTasks } from "./components/list-tasks/FullListTasks";
import { Header } from "./components/header/Header";
import ModalTask from "./components/modal-task/ModalTask";

const App: FC = () => {
    const [listTasks, setListTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [showModalForm, setShowModalForm] = useState<boolean>(false);
    const [changeTheme, setChangeTheme] = useState<boolean>(false);
    const [showInfoTask, setShowInfoTask] = useState<boolean>(false);
    const [detailsAboutTask, setDetailsAboutTask] = useState<Task[]>([])

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
            setListTasks(filtered);
        }
    }

    const openInfoAboutTask = (id: string) => {
        setShowInfoTask(true);

        const currentTask = [...filteredTasks].filter(item => item.id === id);
        setDetailsAboutTask(currentTask);
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
            {
                showInfoTask ? 
                    <ModalTask 
                        item={detailsAboutTask[0]} 
                        setShowInfoTask={setShowInfoTask} />
                : null
            }
            <FullListTasks 
                changeTheme={changeTheme}
                setListTasks={setListTasks} 
                listTasks={listTasks} 
                showModalForm={showModalForm}
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
                setShowModalForm={setShowModalForm}
                openInfoAboutTask={openInfoAboutTask}
                removeTaskFromList={removeTaskFromList}/>
                hello world
        </div>
    )
};

export  {App};


