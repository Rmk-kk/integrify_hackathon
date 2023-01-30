import './kanbancolumn.scss';
import AddIcon from '@mui/icons-material/Add';
import {ColumnColors} from "../../utility/types";
import {Button} from "@mui/material";
import {TaskData} from "../../utility/models";
import {Droppable} from "react-beautiful-dnd";
import KanbanColumnContent from "./KanbanColumnContent/KanbanColumnContent";

interface KanbanColumnProps {
    color: ColumnColors,
    title: string,
    tasks: TaskData[],
    id: string,
}
const KanbanColumn = (props:KanbanColumnProps) => {
    const {color, title, tasks, id} = props;

    return (
            <div className='kanban-column' style={{backgroundColor: `${color}1f`}}>
                <h2 className='kanban-column_title' style={{backgroundColor: `${color}`}}>{title}</h2>
                <Droppable droppableId={id}>
                    {(provided) => <KanbanColumnContent
                        tasks={tasks}
                        provided={provided}
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    />}
                </Droppable>
                <Button variant="outlined" className='kanban-column_btn'>
                    Add Task
                    <AddIcon/>
                </Button>
            </div>

    )
}

export default KanbanColumn;