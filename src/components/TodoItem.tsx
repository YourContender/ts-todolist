import { FC } from "react";
import { TodoTask } from "../types/data"

interface TodoItemProps extends TodoTask{}

const TodoItem: FC<TodoItemProps> = (props) => {
    const {complete, id, title} = props;
    return (
        <div>
            <input type="checkbox" checked={complete} />
            {title}
            <button>&times;</button>
        </div>
    )
}

export { TodoItem };