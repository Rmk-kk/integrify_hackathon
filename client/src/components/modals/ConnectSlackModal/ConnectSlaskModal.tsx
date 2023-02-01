
import '../kanban-modal.scss';
import React, {FormEvent, useState} from 'react'
import * as ReactDOM from 'react-dom';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {updateLink} from "../../../redux/slices/slackLinkReducer";


interface ConnectSlackModalProps {
    editSlackLink: boolean,
    setEditSlackLink:  React.Dispatch<React.SetStateAction<boolean>>,
}
const ConnectSlackModal = (props:ConnectSlackModalProps) => {
    const {editSlackLink, setEditSlackLink} = props;
    const dispatch = useAppDispatch();
    const link = useAppSelector(state => state.slack);
    const [slackLink, setSlackLink] = useState(link);

    if(!editSlackLink ) return null


    const onFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        dispatch(updateLink(slackLink));
        setEditSlackLink(false);
    }

    return ReactDOM.createPortal(
        <>
            <div className='kanban-modal_overlay' onClick={() => setEditSlackLink(false)}></div>
            <div className='kanban-modal'>
                <h1>Connect Slack</h1>
                <Box component="form"
                     className='kanban-modal_form'
                     sx={{
                         '& > :not(style)': { m: 1, width: '25ch' },
                     }}
                     noValidate
                     onSubmit={(e:FormEvent) => onFormSubmit(e)}
                     autoComplete="off"
                >
                    <TextField id="outlined-basic" type='password' onChange={(e) => setSlackLink(e.target.value)} label="Slack API URL" variant="outlined" defaultValue={slackLink}/>

                    <div className='kanban-modal_buttons'>
                        <Button onClick={() => setEditSlackLink(false)} variant="outlined">Close</Button>
                        <Button variant="contained" type='submit'>Save</Button>
                    </div>
                </Box>
            </div>
        </>,
        document.getElementById('modal')!
    )
}

export default ConnectSlackModal