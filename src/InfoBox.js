import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function InfoBox({title,cases,total}) {
    return (
        <Card className='infoBox' style={{flex:1,margin:'4vw',textAlign:'center'}}>
            <CardContent>
                <Typography className='infoBox_title' color='textSecondary'>
                    {title}
                </Typography>
                <h2 className='infoBox_cases'>{total}</h2>
                <Typography className='infoBox_total' color='textSecondary'>
                    Today - {cases}
                </Typography>
            </CardContent>            
        </Card>
    )
}

export default InfoBox
