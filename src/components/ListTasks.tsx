import { FC } from "react";
import { TodoTask } from "../types/data";
import { TodoItem } from "./TodoItem";

interface ItemTodoProps {
    items: TodoTask[];
}

const ListTasks: FC<ItemTodoProps> = (props) => {
    return (
        <div>
            {
                props.items.map(elem => {
                    return <TodoItem key={elem.id} {...elem} />
                })
            }
        </div>
    )
}

export { ListTasks };