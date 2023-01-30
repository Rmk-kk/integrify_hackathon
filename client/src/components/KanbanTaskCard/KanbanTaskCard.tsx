import './kanbanTaskCard.scss';
import {Priority, TaskPersonData} from "../../utility/models";
import {Draggable} from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import KanbanTaskCardPerson from "./KanbanTaskCardPerson/KanbanTaskCardPerson";
import React from 'react';

interface KanbanTaskCardProps {
    data : {
        id: string,
        title: string,
        date: string,
        description: string,
        priority: Priority,
        creator: TaskPersonData,
        assigned: TaskPersonData,
    },
    index: number
}
const KanbanTaskCard = (props: KanbanTaskCardProps) => {
    const {index} = props;
    const {id, title, assigned, creator, description, date, priority} = props.data;
    // style={{border: `1px solid ${priority.color}`}} - for borders ??
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div className='kanban-task'
                     ref={provided.innerRef}
                     data-dragging={snapshot.isDragging}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                >
                        <EditIcon className='kanban-task_edit'/>
                        <div className='kanban-task_item'>
                            <h4>Title</h4>
                            <p className='kanban-task_item-title'>{title}</p>
                        </div>
                        <div className='kanban-task_item'>
                            <h4>Created On</h4>
                            <p>{date}</p>
                        </div>
                        <div className='kanban-task_item kanban-task_item-description'>
                            <h4>Description</h4>
                            <p>{description}.</p>
                        </div>
                        {/*<div className='kanban-task_item'>*/}
                        {/*    <h4>Priority</h4>*/}
                        {/*    <p id='task-priority' style={{backgroundColor: `${priority.background}`, color: `${priority.color}`}}>{priority.text}</p>*/}
                        {/*</div>*/}
                        {/*<div className='kanban-task_item'>*/}
                        {/*    <h4>Creator</h4>*/}
                        {/*    <KanbanTaskCardPerson person={creator}/>*/}
                        {/*</div>*/}
                        <div className='kanban-task_item'>
                            <h4>Assigned</h4>
                            <KanbanTaskCardPerson person={assigned}/>
                        </div>
                </div>
            )}
        </Draggable>
    )
}

export default KanbanTaskCard;