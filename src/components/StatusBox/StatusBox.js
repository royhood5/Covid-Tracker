import React from "react";
import './StatusBox.css'
import {Card,CardContent,Typography} from "@material-ui/core";
function StatusBox({title,cases,active,isdisplayed,total,color,...props}){
    return(
        <Card
            className={`statusbox ${active && 'statusbox--selected'}  ${isdisplayed && 'status--displayed'}`}
            style={{borderBottom:`4px solid ${color}`}}
            onClick={props.onClick}
        >
        <CardContent>
            {/*Title*/}
            <Typography className='statusbox_title' color='textSecondary'>{title}</Typography>

            {/*Records*/}
            <h2 className='statusbox_cases'>{cases}</h2>

            {/*Total*/}
            <Typography className='statusbox_total' color='textSecondary'>Total: {total}</Typography>


        </CardContent>
        </Card>
    )
}

export default StatusBox