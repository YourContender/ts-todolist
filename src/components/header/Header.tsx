import { FC, useState, useEffect } from "react";
import '../../sass/header-styles/Header-styles.scss';

const Header: FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(currentTime);

    return (
        <div className="header">
            <div className="header_left">
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
                        <p>24</p>
                        <span>home</span>
                    </div>
                    <div className="header_right-personal">
                        <p>12</p>
                        <span>life</span>
                    </div>
                    <div className="header_right-work">
                        <p>17</p>
                        <span>work</span>
                    </div>
                </div>

                <div className="header_right-complete">
                    <span>65% completed tasks</span>
                </div>
            </div>
        </div>
    )
}

export { Header }