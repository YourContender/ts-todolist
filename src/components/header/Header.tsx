import { FC, useState, useEffect } from "react";

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
                <div className="header_left-title">My Todo</div>
                <div className="header_left-date">{formattedDate}</div>
            </div>
            <div className="header_right">
                <div className="header_right-category">
                    <div className="header_right-home"></div>
                    <div className="header_right-personal"></div>
                    <div className="header_right-work"></div>
                </div>

                <div className="header_right-complete">

                </div>
            </div>
        </div>
    )
}

export { Header }