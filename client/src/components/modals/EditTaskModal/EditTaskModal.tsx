import '../kanban-modal.scss';
import React, {useState} from 'react'
import * as ReactDOM from 'react-dom';
import {Priority, TaskPersonData} from "../../../utility/models";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {taskPriority} from "../../../utility/TaskPriorities";

interface EditTaskModalProps {
    data: {
        id: string,
        title: string,
        description: string,
        priority: Priority,
        assigned: TaskPersonData,
    }
    editTask: boolean,
    setEditTask:  React.Dispatch<React.SetStateAction<boolean>>,
}
const EditTaskModal = (props:EditTaskModalProps) => {
    const {editTask, setEditTask} = props;
    const {id, title, assigned, description, priority} = props.data;

    const [priorityType, setPriorityType] = useState(priority);
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [taskAssigned, setTaskAssigned] = useState(assigned);

    if(!editTask ) return null

    const updateCheckBox = (event:React.FormEvent<HTMLInputElement>) => {
        const priority = taskPriority[event.currentTarget.value];
        setPriorityType(priority);
    }

    const updateDropDownMenu = (event:any) => {
        console.log(event.target.value);
        /*
        const person = get data from all users, find person
         */
    }
    return ReactDOM.createPortal(
        <>
            <div className='kanban-modal_overlay' onClick={() => setEditTask(false)}></div>
            <div className='kanban-modal'>
                <h1>Edit Task</h1>
                <Box component="form"
                     className='kanban-modal_form'
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Title" variant="outlined" defaultValue={taskTitle}/>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={3}
                        defaultValue={taskDescription}
                    />
                    <div className='kanban-modal_form-checkbox'>
                        <div>
                            <input type="radio"
                                   onChange={(e:React.FormEvent<HTMLInputElement>) => updateCheckBox(e)}
                                   id='priority-checkbox_low'
                                   value="Low"
                                   checked={priorityType.text === 'Low'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:"#2196534f", color: "#219653"}} className="container" htmlFor='priority-checkbox_low'>Low</label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e:React.FormEvent<HTMLInputElement>) => updateCheckBox(e)}
                                   id='priority-checkbox_medium'
                                   value="Medium"
                                   checked={priorityType.text === 'Medium'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:"#F2C94C4f", color: "#F2C94C"}} className="container" htmlFor='priority-checkbox_medium'>Medium</label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e:React.FormEvent<HTMLInputElement>) => updateCheckBox(e)}
                                   id='priority-checkbox_high'
                                   value="High"
                                   checked={priorityType.text === 'High'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:"#EB57574f", color: "#EB5757"}} className="container" htmlFor='priority-checkbox_high'>High</label>
                        </div>
                    </div>
                    <FormControl className='kanban-modal_dropdown'>
                        <InputLabel id="demo-simple-select-label">Assigned</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={taskAssigned.name}
                            label="Assigned"
                            onChange={(e:any) => updateDropDownMenu(e)}
                        >
                            <MenuItem value={taskAssigned.name}>{taskAssigned.name}</MenuItem>
                            <MenuItem value={"Boris"}>Boris</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className='kanban-modal_buttons'>
                    <Button onClick={() => setEditTask(false)} variant="outlined">Close</Button>
                    <Button variant="contained">Save</Button>
                </div>

            </div>
        </>,
        document.getElementById('modal')!
    )
}

export default EditTaskModal