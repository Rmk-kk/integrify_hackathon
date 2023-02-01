import './header.scss';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import { logOut } from '../../redux/slices/userReducer';
import { useDispatch } from 'react-redux';
import GithubIssues from '../GithubIssues/GithubIssues';
import ConnectSlackModal from "../modals/ConnectSlackModal/ConnectSlaskModal";
import {useAppSelector} from "../../hooks/reduxHooks";


const Header = () => {
    const [editSlackLink, setEditSlackLink] = useState(false);
    const link = useAppSelector(state => state.slack);
    const dispatch = useDispatch();
    return (
        <>
            <div className='header'>
                <div className="header-content">
                    <img src="./photo-1438761681033-6461ffad8d80.jpg" alt="avatar"/>
                    <nav className="header-content_navbar">
                        <GithubIssues/>
                        <button className='header-content_navbar-item header-content_navbar-btn' onClick={() => setEditSlackLink(true)}>
                            {(link && link.length > 1 ) ? <CloudDoneIcon style={{fill: '#F2994A'}}/> : <CloudQueueIcon/>}
                            <h4>Connect<br/>Slack</h4>
                        </button>
                        <NavLink to={'/'} className="header-content_navbar-item header-content_navbar-btn">
                            <AssignmentTurnedInIcon/>
                            <h4>Workspace</h4>
                        </NavLink>
                        <NavLink to={"/settings"} className="header-content_navbar-item">
                            <AccountCircleIcon/>
                            <h4>Settings</h4>
                        </NavLink>
                        <NavLink to={"/login"} className="header-content_navbar-item">
                            <LogoutIcon onClick={() => dispatch(logOut())}/>
                            <h4>Logout</h4>
                        </NavLink>
                    </nav>
                </div>
            </div>
            <ConnectSlackModal editSlackLink={editSlackLink} setEditSlackLink={setEditSlackLink}/>
        </>

    )
}

export default Header;