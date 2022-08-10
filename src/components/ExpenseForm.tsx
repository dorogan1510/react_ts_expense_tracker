import React, { useEffect, useState } from 'react'
import { TextField, Box, Paper, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControlUnstyled from '@mui/base/FormControlUnstyled'

import { useDispatch, useSelector } from 'react-redux'
import { setAmount, setTitle, setDate } from '../features/formSlice'
import {
    chart,
    expense,
    selectAmount,
    selectDate,
    selectTitle,
} from '../store/store'
import { addExpense } from '../features/expenseSlice'
import { IchartData, setChart, setChartSame } from '../features/chartSlice'

const ExpenseForm = () => {
    const dispatch = useDispatch()
    const enteredTitle = useSelector(selectTitle)
    const enteredAmount = useSelector(selectAmount)
    const enteredDate = useSelector(selectDate)
    const chartAmount = useSelector(chart)

    const [isTitle, setIsTitle] = useState(true)
    const [isAmount, setIsAmount] = useState(true)
    const [isDate, setIsDate] = useState(true)

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setTitle(event.target.value))
    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setAmount(Number(event.target.value)))
    const dateChangeHandler = (newValue: Date | null) => {
        dispatch(setDate(newValue))
    }

    const newChartItem: IchartData = {
        id: Math.random(),
        x: enteredDate?.toLocaleString('en-EN', {
            month: 'short',
        }),
        y: enteredAmount,
    }

    const plusChartAmount = (object: IchartData) => {
        const exist = chartAmount.find(item => item.x === object.x)

        if (exist && exist !== null) {
            dispatch(
                setChartSame(
                    chartAmount.map(item =>
                        item.x === object.x &&
                        typeof exist.y !== 'string' &&
                        typeof enteredAmount !== 'string'
                            ? { ...exist, y: exist.y + enteredAmount }
                            : item
                    )
                )
            )
        } else {
            dispatch(setChart(newChartItem))
        }
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

            plusChartAmount(newChartItem)

            dispatch(setTitle(''))
            dispatch(setAmount(''))
            dispatch(setDate(null))
        }

        if (enteredTitle.trim().length <= 0) {
            setIsTitle(false)
        }

        if (enteredAmount <= 0) {
            setIsAmount(false)
        }

        if (enteredDate == null) {
            setIsDate(false)
        }
    }

    useEffect(() => {
        setIsTitle(true)
    }, [enteredTitle])

    useEffect(() => {
        setIsAmount(true)
    }, [enteredAmount])

    useEffect(() => {
        setIsDate(true)
    }, [enteredDate])

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
                                error={!isTitle}
                                id='title'
                                label='Title'
                                size='medium'
                                type='text'
                                value={enteredTitle}
                                onChange={titleChangeHandler}
                                sx={{ width: '33%' }}
                            />
                            <TextField
                                error={!isAmount}
                                id='amount'
                                label='Amount, $'
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
                                        <TextField
                                            {...params}
                                            error={!isDate}
                                        />
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
                        </Box>
                    </Paper>
                </Box>
            </FormControlUnstyled>
        </>
    )
}

export default ExpenseForm
