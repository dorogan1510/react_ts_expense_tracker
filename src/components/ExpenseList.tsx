import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterExpense, setNoFilterExpense } from '../features/expenseSlice'
import { changeMonth } from '../features/filterSlice'
import { expense, filteredMonth, filterExpense } from '../store/store'
import ExpensesFilter from './ExpenseFilter'
import ExpenseItem from './ExpenseItem'

const ExpenseList = () => {
    const newExpense = useSelector(expense)
    const newFilterExpense = useSelector(filterExpense)
    const selectedMonth = useSelector(filteredMonth)
    const dispatch = useDispatch()

    const [isfiltered, setIsFiltered] = useState(true)

    // const projects = useSelector(
    //     // could move this function to another file
    //     // this could be written more concisely, but I'm trying to be clear instead
    //     state => {
    //         const all = newExpense
    //         const filterId = newFilterExpense
    //         if (newFilterExpense === null) {
    //             return newExpense
    //         } else {
    //             return newExpense.filter(project => project.id === filterId)
    //         }
    //     }
    // )

    const startFilterHandler = () => {
        setIsFiltered(false)
        dispatch(setFilterExpense(selectedMonth))
    }

    const cancelFilterHandler = () => {
        setIsFiltered(true)
        dispatch(setNoFilterExpense(selectedMonth))
    }

    const filterChangeHandler = (month: string) => {
        dispatch(changeMonth(month))
    }

    if (newExpense.length === 0) {
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
        <>
            {isfiltered ? (
                <>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            className='expenses'
                            type='button'
                            onClick={startFilterHandler}
                        >
                            Filter
                        </Button>
                    </Box>
                    <ExpenseItem expenses={newExpense} />
                </>
            ) : (
                <>
                    <ExpensesFilter
                        cancelFilterHandler={cancelFilterHandler}
                        filterChangeHandler={filterChangeHandler}
                    />
                    <ExpenseItem expenses={newFilterExpense} />
                </>
            )}
        </>
    )
}

export default ExpenseList
