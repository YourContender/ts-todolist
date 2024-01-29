import { FC } from 'react';
import { Task } from '../../types/types';
import './modal-task.scss';

interface ModalTaskProps {
    item: Task,
    setShowInfoTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalTask: FC<ModalTaskProps> = ({ item, setShowInfoTask }) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(item.time));

    return (
        <div className="modal">
            <div className="modal_task">
                <button 
                    className="modal_task-btn"
                    onClick={() => setShowInfoTask(false)}
                >
                    &times;
                </button>

                <div className="modal_task-info">
                    <div className='modal_task-title'>
                        <span className='modal_task-label'>title task: </span>
                        <span className='modal_task-text'>{item.title}</span>
                    </div>
                    <div className='modal_task-description'>
                        <span className='modal_task-label'>description task: </span>
                        <span className='modal_task-text'>{item.description}</span>
                    </div>
                    <div className='modal_task-category'>
                        <span className='modal_task-label'>category task: </span>
                        <span className='modal_task-text'>{item.category}</span>
                    </div>
                    <div className="modal_task-addition">
                        <span className='modal_task-label'>date create task: </span>
                        <span className='modal_task-text'>{formattedDate}</span>
                    </div>
                    <div className="modal_task-id">
                        <span className='modal_task-label'>id task: </span>
                        <span className='modal_task-text'>{item.id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTask;