import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Paper,
    Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addExpense, deleteExpense } from '../features/form/expenseSlice'
import { expense } from '../store/store'

const ExpenseItem = () => {
    const newExpense = useSelector(expense)
    const dispatch = useDispatch()

    if (newExpense.length === 0) {
        return (
            <Typography
                variant='h5'
                component='div'
                sx={{ padding: 3, textAlign: 'center' }}
            >
                No expense
            </Typography>
        )
    }

    return (
        <>
            {newExpense.map(item => (
                <Paper
                    elevation={5}
                    key={item.id}
                    sx={{ marginBottom: '1rem' }}
                >
                    <Card
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            minWidth: 275,
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Paper
                                elevation={5}
                                sx={{
                                    padding: 3,
                                    textAlign: 'center',
                                    width: '50px',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    component='div'
                                    color='text.secondary'
                                    gutterBottom
                                >
                                    <Box className='expense-item__date__year'>
                                        {item.date.toLocaleString('en-EN', {
                                            year: 'numeric',
                                        })}
                                    </Box>
                                    <Box className='expense-item__date__month'>
                                        {item.date.toLocaleString('en-EN', {
                                            month: 'long',
                                        })}
                                    </Box>
                                    <Box className='expense-item__date__day'>
                                        {item.date.toLocaleString('en-EN', {
                                            day: 'numeric',
                                        })}
                                    </Box>
                                </Typography>
                            </Paper>
                        </CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flex: '1 1',
                            }}
                        >
                            <Typography
                                variant='h5'
                                component='div'
                                sx={{ flex: '1 1' }}
                            >
                                {item.title}
                            </Typography>
                            <Typography variant='h5' component='div'>
                                ${item.amount}
                            </Typography>
                        </Box>
                        <CardActions>
                            <Button
                                variant='contained'
                                size='small'
                                onClick={() => {
                                    dispatch(deleteExpense(item))
                                }}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Paper>

                // <div className='expense-item' key={item.id}>
                //     <div className='expense-item__date'>
                // <div className='expense-item__date__year'>
                //     {item.date.toLocaleString('en-EN', {
                //         year: 'numeric',
                //     })}
                // </div>
                // <div className='expense-item__date__month'>
                //     {item.date.toLocaleString('en-EN', {
                //         month: 'long',
                //     })}
                // </div>
                // <div className='expense-item__date__day'>
                //     {item.date.toLocaleString('en-EN', {
                //         day: 'numeric',
                //     })}
                // </div>
                //     </div>
                //     <div className='expense-item__description'>
                //         <h2>{item.title}</h2>
                //         <div className='expense-item__price'>
                //             {item.amount} $
                //         </div>
                //     </div>
                //     <button className='expense-item'>Delete</button>
                // </div>
            ))}

            {/* <BarChart expense={expense} /> */}
        </>
    )
}

export default ExpenseItem
