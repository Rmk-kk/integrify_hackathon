import React, {FormEvent, useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";

import * as ReactDOM from "react-dom";
import {Box, Button, TextField} from "@mui/material";
import {ColumnColors} from "../../../utility/types";
import {modifyColumn} from "../../../redux/slices/columnReducer";

interface EditColumnModalProps {
    editColumn: boolean,
    setEditColumn:  React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    id: string,
    color: string,
}
const EditColumnModal = (props:EditColumnModalProps) => {
    const {editColumn, setEditColumn, title, id, color} = props;
    const [columnTitle, setColumnTitle] = useState(title);
    const [columnColor, setColumnColor] = useState<string>(color);
    const dispatch = useAppDispatch();

    if(!editColumn ) return null

    const handleFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        const updatedColumn = {
            id: id,
            title: columnTitle,
            color: columnColor
        }
        if(updatedColumn.title.length < 1) {
            return
        } else {
            dispatch(modifyColumn(updatedColumn));
            setEditColumn(false);
        }
    }


    return ReactDOM.createPortal(
        <>
            <div className='kanban-modal_overlay' onClick={() => setEditColumn(false)}></div>
            <div className='kanban-modal'>
                <h1>Edit Column</h1>
                <Box component="form"
                     onSubmit = {(e:FormEvent) => handleFormSubmit(e)}
                     className='kanban-modal_form'
                     sx={{
                         '& > :not(style)': { m: 1, width: '25ch' },
                     }}
                     noValidate
                     autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Title" variant="outlined" defaultValue={columnTitle} onChange={(e) => setColumnTitle(e.target.value)}/>
                    <div className='kanban-modal_form-checkbox checkbox-columns'>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_blue'
                                   value={'#2D9CDB'}
                                   checked={columnColor === '#2D9CDB'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:`${ColumnColors.Blue}`}} className="container " htmlFor='priority-checkbox_blue'></label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_red'
                                   value={'#EB5757'}
                                   checked={columnColor === '#EB5757'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:`${ColumnColors.Red}`}} className="container " htmlFor='priority-checkbox_red'></label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_green'
                                   value={'#27AE60'}
                                   checked={columnColor === '#27AE60'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:`${ColumnColors.Green}`}} className="container " htmlFor='priority-checkbox_green'></label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_yellow'
                                   value={'#F2C94C'}
                                   checked={columnColor === '#F2C94C'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:`${ColumnColors.Yellow}`}} className="container " htmlFor='priority-checkbox_yellow'></label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_grey'
                                   value={'#4F4F4F'}
                                   checked={columnColor === '#4F4F4F'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:ColumnColors.Grey}} className="container " htmlFor='priority-checkbox_grey'></label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_orange'
                                   value={'#F2994A'}
                                   checked={columnColor === '#F2994A'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:`${ColumnColors.Orange}`}} className="container " htmlFor='priority-checkbox_orange'></label>
                        </div>
                        <div>
                            <input type="radio"
                                   onChange={(e) => setColumnColor(e.currentTarget.value)}
                                   id='priority-checkbox_purple'
                                   value={'#9B51E0'}
                                   checked={columnColor === '#9B51E0'}
                                   name='priority-checkbox'/>
                            <label style={{backgroundColor:`${ColumnColors.Purple}`}} className="container " htmlFor='priority-checkbox_purple'></label>
                        </div>
                    </div>
                    {columnColor && columnTitle &&
                        <div className='kanban-modal_preview'>
                            <h2 className='kanban-column_title'
                                style={{backgroundColor: `${columnColor}`}}>
                                {columnTitle}
                            </h2>
                        </div>}
                    <div className='kanban-modal_buttons'>
                        <Button onClick={() => setEditColumn(false)} variant="outlined">Close</Button>
                        <Button variant="contained" type='submit'>Edit</Button>
                    </div>
                </Box>
            </div>
        </>,
        document.getElementById('modal')!
    )
}

export default EditColumnModal;