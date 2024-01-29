import { FC, useState, useEffect } from "react";
import { Diagram } from "./diagram/Diagram";
import { Task } from "../../types/types";
import './header.scss';
import { SwitchTheme } from "../switch-theme/SwitchTheme";

interface ListTasksProps {
    listTasks: Task[];
    setChangeTheme: React.Dispatch<React.SetStateAction<boolean>>;
    changeTheme: boolean;
}

const Header: FC<ListTasksProps> = ({ listTasks, setChangeTheme, changeTheme }) => {
    const [percentDone, setPercentDone ] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [quantityHomeTasks, setQuantityHomeTasks] = useState<number>(0);
    const [quantityLifeTasks, setQuantityLifeTasks] = useState<number>(0);
    const [quantityWorkTasks, setQuantityWorkTasks] = useState<number>(0);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let completeListTasks = listTasks.filter(item => item.complete === true);
        let homeTasks = listTasks.filter(item => item.category === 'home');
        let lifeTasks = listTasks.filter(item => item.category === 'life');
        let workTasks = listTasks.filter(item => item.category === 'work');

        setQuantityHomeTasks(homeTasks.length);
        setQuantityLifeTasks(lifeTasks.length);
        setQuantityWorkTasks(workTasks.length);

        setPercentDone(Math.floor(completeListTasks.length * 100 / listTasks.length))
    }, [listTasks])

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(currentTime);

    return (
        <div className={changeTheme ? "header noon" : "header"}>
            <div className="header_left">
                <div className="header_left-switch">
                    <SwitchTheme 
                        setChangeTheme={setChangeTheme} 
                        changeTheme={changeTheme}/>
                </div>
                <div className="header_left-title">
                    My Todo
                </div>
                <div className="header_left-date">
                    {formattedDate}
                </div>
            </div>
            <div className="header_right">
                <div className="header_right-category">
                    <div className="header_right-home">
                        <p>{quantityHomeTasks}</p>
                        <span>home</span>
                    </div>
                    <div className="header_right-personal">
                        <p>{quantityLifeTasks}</p>
                        <span>life</span>
                    </div>
                    <div className="header_right-work">
                        <p>{quantityWorkTasks}</p>
                        <span>work</span>
                    </div>
                </div>

                <div className="header_right-complete">
                    <Diagram percent={!isNaN(percentDone) ? percentDone : 0}/>
                    
                    <span>
                        {!isNaN(percentDone) ? percentDone : 0}
                        % completed tasks
                    </span>
                </div>
            </div>
        </div>
    )
}

export { Header }