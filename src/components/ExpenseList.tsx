import { Box, Button, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BarChart from '../Chart/BarChart'
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

    const [isfiltered, setIsFiltered] = useState<boolean>(true)
    const [isStatistics, setIsStatistics] = useState<boolean>(true)

    const startFilterHandler = () => {
        setIsFiltered(false)
        dispatch(setFilterExpense(selectedMonth))
    }
    const startStasticHandler = () => {
        setIsStatistics(false)
    }
    const cancelStasticHandler = () => {
        setIsStatistics(true)
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
                    No expenses
                </Typography>
            </motion.div>
        )
    }

    return (
        <>
            {!isStatistics && (
                <AnimatePresence>
                    <BarChart cancelStasticHandler={cancelStasticHandler} />
                </AnimatePresence>
            )}
            {isfiltered ? (
                <>
                    <Box sx={{ textAlign: 'center', margin: '1rem 0' }}>
                        {isStatistics && (
                            <>
                                <Button
                                    type='button'
                                    onClick={startFilterHandler}
                                >
                                    Filter
                                </Button>
                                <Button
                                    type='button'
                                    onClick={startStasticHandler}
                                >
                                    Statistics
                                </Button>
                            </>
                        )}
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
