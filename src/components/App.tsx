import { FC, useState, useEffect, useRef } from "react";
import { TodoTask } from "../types/data";
import { ListTasks } from "./ListTasks";

const App: FC = () => {
    const [value, setValue] = useState('');
    const [listTasks, setListTasks] = useState<TodoTask[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    const addTodoInList = () => {
        if (value) {
            setListTasks([...listTasks, {
                id: Date.now(),
                title: value,
                complete: false
            }])

            setValue('');
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

	return <div>
        <div>
            <input 
                type="enter your task" 
                value={value} 
                onChange={handleChange} 
                ref={inputRef}
            />
            <button onClick={addTodoInList}>add task</button>
        </div>
        <ListTasks items={listTasks}/>
    </div>;
};

export default App;
