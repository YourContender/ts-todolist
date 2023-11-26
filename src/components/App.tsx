import { FC, useEffect, useState } from "react";
import { Forms } from "./forms/Forms";
import { Task } from "../types/types";
import { FullListTasks } from "../components/list-tasks/FullListTasks";
import { Header } from "./header/Header";
import { Test } from "./header/Test";

const App: FC = () => {
    const [listTasks, setListTasks] = useState<Task[]>([]);
    const [showModalForm, setShowModalForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://654d3af877200d6ba85a2a97.mockapi.io/listTasks');
                const body: Task[] = await res.json();
                setListTasks(body);
                console.log('work', body)
            } catch {
                console.log('error')
            }
        } 
        fetchData();
    }, [])
        

    const removeTaskFromList = async (id: string) => {
        let filtered = listTasks.filter(item => {
            console.log('item id: ', item.id);
            console.log('id: ', id)
            return item.id !== id
        });
        let API = 'https://654d3af877200d6ba85a2a97.mockapi.io/listTasks';

        const res = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });

        if (res.status === 200) {
            setListTasks(filtered);
        }
    }

	return (
        <div>
            <Header listTasks={listTasks}/>
            {
                showModalForm ? 
                    <Forms 
                        setListTasks={setListTasks} 
                        listTasks={listTasks}
                        setShowModalForm={setShowModalForm}/>
                : null
            }
            <FullListTasks 
                setListTasks={setListTasks} 
                listTasks={listTasks} 
                setShowModalForm={setShowModalForm}
                removeTaskFromList={removeTaskFromList}/>
            
            <Test percent={20}/>
        </div>
    )
};

export default App;


