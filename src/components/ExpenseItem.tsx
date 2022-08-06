import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Paper,
    Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteExpense, Iexpense } from '../features/expenseSlice'
import { AnimatePresence, motion } from 'framer-motion'
import DeleteIcon from '@mui/icons-material/Delete'

const ExpenseItem = ({ expenses }: any) => {
    const dispatch = useDispatch()

    if (expenses.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Typography
                    variant='h5'
                    component='div'
                    sx={{ padding: 3, textAlign: 'center' }}
                >
                    No expense
                </Typography>
            </motion.div>
        )
    }

    return (
        <AnimatePresence>
            {expenses.map((item: Iexpense) => (
                <div key={item.id}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
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
                                                {item.date.toLocaleString(
                                                    'en-EN',
                                                    {
                                                        year: 'numeric',
                                                    }
                                                )}
                                            </Box>
                                            <Box className='expense-item__date__month'>
                                                {item.date.toLocaleString(
                                                    'en-EN',
                                                    {
                                                        month: 'long',
                                                    }
                                                )}
                                            </Box>
                                            <Box className='expense-item__date__day'>
                                                {item.date.toLocaleString(
                                                    'en-EN',
                                                    {
                                                        day: 'numeric',
                                                    }
                                                )}
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
                                        variant='body1'
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
                                    <IconButton
                                        aria-label='delete'
                                        onClick={() => {
                                            dispatch(deleteExpense(item))
                                        }}
                                    >
                                        <DeleteIcon color='primary' />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Paper>
                    </motion.div>
                </div>
            ))}
        </AnimatePresence>
    )
}

export default ExpenseItem
