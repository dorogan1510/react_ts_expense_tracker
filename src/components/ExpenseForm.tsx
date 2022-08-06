import React, { useState } from 'react'
import { TextField, Box, Paper, Button, Fab } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControlUnstyled from '@mui/base/FormControlUnstyled'
import AddIcon from '@mui/icons-material/Add'

import { useDispatch, useSelector } from 'react-redux'
import { setAmount, setTitle, setDate } from '../features/formSlice'
import { expense, selectAmount, selectDate, selectTitle } from '../store/store'
import { addExpense } from '../features/expenseSlice'

const ExpenseForm = () => {
    const dispatch = useDispatch()
    const enteredTitle = useSelector(selectTitle)
    const enteredAmount = useSelector(selectAmount)
    const enteredDate = useSelector(selectDate)
    const newExpense = useSelector(expense)

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setTitle(event.target.value))
    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setAmount(event.target.value))
    const dateChangeHandler = (newValue: Date | null) => {
        dispatch(setDate(newValue))
    }

    const formSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (
            enteredTitle.trim().length > 0 &&
            enteredAmount! > 0 &&
            enteredDate !== null
        ) {
            dispatch(
                addExpense({
                    id: Math.random().toString(),
                    title: enteredTitle,
                    amount: enteredAmount,
                    date: new Date(enteredDate),
                })
            )
        }
    }

    return (
        <>
            <FormControlUnstyled defaultValue='' required>
                <Box
                    sx={{
                        margin: '0 auto',
                        padding: '2rem 1rem',
                        maxWidth: '700px',
                    }}
                >
                    <Paper
                        elevation={5}
                        sx={{
                            padding: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <TextField
                                id='title'
                                label='Title'
                                size='medium'
                                type='text'
                                value={enteredTitle}
                                onChange={titleChangeHandler}
                                sx={{ width: '33%' }}
                            />
                            <TextField
                                id='amount'
                                label='Amount'
                                type='number'
                                size='medium'
                                value={enteredAmount}
                                onChange={amountChangeHandler}
                                sx={{ width: '33%' }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label='Date'
                                    value={enteredDate}
                                    onChange={dateChangeHandler}
                                    renderInput={params => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                variant='contained'
                                sx={{ marginRight: '1rem' }}
                                onClick={formSubmitHandler}
                            >
                                Add expense
                            </Button>
                            <Button variant='contained'>Cancel</Button>
                        </Box>
                    </Paper>
                </Box>
            </FormControlUnstyled>
        </>
    )
}

export default ExpenseForm
