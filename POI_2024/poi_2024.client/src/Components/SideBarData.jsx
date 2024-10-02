import React from 'react';
import SmsIcon from '@mui/icons-material/Sms';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const SideBarData = [
    {
        title: "Chats",
        icon: <SmsIcon style={{fontSize:"32px"}}/>,
        link: "/Chats",
    },
    {
        title: "Shop",
        icon: <WorkspacePremiumIcon style={{fontSize:"32px"}}/>,
        link: "/Shop",
    },
    {
        title: "Assignments",
        icon: <AssignmentIcon style={{fontSize:"32px"}}/>,
        link: "/Assignments",
    },
]