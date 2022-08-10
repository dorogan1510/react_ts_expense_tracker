import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { chart } from '../store/store'
import { Box, Button, Paper } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const BarChart = ({ cancelStasticHandler }: any) => {
    const chartAmount = useSelector(chart)

    const options = {
        radius: 3,

        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
            },
        },
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    }

    const labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    const data = {
        labels,
        datasets: [
            {
                data: chartAmount,
                label: '$',
                borderColor: '#5f0303',
                tension: 0.5,
                pointBackgroundColor: '#620505',
                pointBorderColor: '#C4C4C4',
                backgroundColor: '#C4C4C4',
                borderRadius: 5,
            },
        ],
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
            >
                <Paper>
                    <Bar
                        options={options}
                        data={data}
                        style={{ padding: '1rem' }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                        <Button onClick={cancelStasticHandler}>Cancel</Button>
                    </Box>
                </Paper>
            </motion.div>
        </AnimatePresence>
    )
}

export default BarChart
