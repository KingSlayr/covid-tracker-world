import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'

const options = {
    legend:'per day cases',
    elements:{
        points:{
            radius:0
        }
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:'index',
        intersect:false,
        callbacks:{
            label: function(tooltipItem,data){
                return numeral(tooltipItem.value).format('+0,0')
            }
        }
    },
    scales:{
        xAxes:[{
            type:'time',
            time:{
                format:'MM/DD/YY',
                tooltipFormat:'ll'
            }
        }],
        yAxes:[{
            gridLines:{
                display:false
            },
            ticks:{
                callback:function(value,index,values){
                    return numeral(value).format('0a')
                }
            }
        }]
        
    }
}

export default function LineGraph() {
    const [data, setData] = useState({})
    const [type, setType] = useState('cases')


    const buildChartData = (data,casesType='cases') => {
        const chartData = []
        let lastDataPoint;
        for(let date in data[casesType]) {
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data[casesType][date]-lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint=data[casesType][date]            
        };
        return chartData
    }


    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data['cases']);
                setData(buildChartData(data,type))
            })
        }

        fetchData()
        

    }, [])




    return (
        <div>
        {data?.length>0 && (
            <Line
                options={options}
                data={{
                    datasets:[{
                        backgroundColor:'rgba(204,16,52,0.5)',
                        borderColor:'#cc1034',
                        data:data
                    }]
                }}
            />
        )}
        </div>
    )
}
