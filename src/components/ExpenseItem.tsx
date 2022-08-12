import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpense, editExpense, Iexpense } from '../features/expenseSlice'
import { AnimatePresence, motion } from 'framer-motion'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    deleteChart,
    editChart,
    IchartData,
    setChart,
} from '../features/chartSlice'
import { chart, expense } from '../store/store'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const ExpenseItem = ({ expenses }: any) => {
    const dispatch = useDispatch()
    const chartAmount = useSelector(chart)
    const newExpense = useSelector(expense)

    const [isEditingExpense, setIsEditingExpense] = useState<string | null>(
        null
    )
    const [isEditTextStart, setIsEditTextStart] = useState<boolean>(true)
    const [isEditAmountStart, setIsEditAmountStart] = useState<boolean>(true)
    const [isEditDateStart, setIsEditDateStart] = useState<boolean>(true)

    const [editText, setEditText] = useState<string>('')
    const [editAmount, setEditAmount] = useState<number>(0)
    const [editDate, setEditDate] = useState<Date | null>(null)

    const [isEditTitleClick, setIsEditTitleClick] = useState<boolean>(false)
    const [isEditAmountClick, setIsEditAmountClick] = useState<boolean>(false)
    const [isEditDateClick, setIsEditDateClick] = useState<boolean>(false)

    useEffect(() => {
        if (editText.trim().length > 0) {
            setIsEditTextStart(true)
        }
        if (editAmount > 0) {
            setIsEditAmountStart(true)
        }
        if (editDate !== null) {
            setIsEditDateStart(true)
        }
    }, [editText, editAmount, editDate])

    const editChartAmount = (object: Iexpense) => {
        const exist = chartAmount.find(
            item =>
                item.x ===
                object.date.toLocaleString('en-EN', {
                    month: 'short',
                })
        )

        if (exist) {
            dispatch(
                editChart(
                    chartAmount.map(item =>
                        item.x ===
                            object.date.toLocaleString('en-EN', {
                                month: 'short',
                            }) &&
                        typeof object.amount === 'number' &&
                        typeof exist.y === 'number'
                            ? {
                                  ...exist,
                                  y: exist.y - object.amount + editAmount,
                              }
                            : item
                    )
                )
            )
        }
    }

    const deleteChartAmount = (object: Iexpense) => {
        const exist = chartAmount.find(
            item =>
                item.x ===
                object.date.toLocaleString('en-EN', {
                    month: 'short',
                })
        )

        if (exist) {
            dispatch(
                deleteChart(
                    chartAmount.map(item =>
                        item.x ===
                            object.date.toLocaleString('en-EN', {
                                month: 'short',
                            }) &&
                        typeof object.amount === 'number' &&
                        typeof exist.y === 'number'
                            ? { ...exist, y: exist.y - object.amount }
                            : item
                    )
                )
            )
        }
    }

    const submitEditExpense = (object: Iexpense) => {
        editText.trim().length > 0
            ? setIsEditTextStart(true)
            : setIsEditTextStart(false)

        editAmount > 0
            ? setIsEditAmountStart(true)
            : setIsEditAmountStart(false)

        editDate !== null ? setIsEditDateStart(true) : setIsEditDateStart(false)

        if (editText.trim().length > 0 && editAmount > 0 && editDate !== null) {
            setIsEditTextStart(true)

            const exist = newExpense.find(item => item.id === object.id)

            const updatedExpense: Iexpense[] = newExpense.map(item =>
                item.id === object.id && exist && editDate !== null
                    ? {
                          ...exist,
                          title: editText,
                          amount: editAmount,
                          date: editDate,
                      }
                    : item
            )

            dispatch(editExpense(updatedExpense))

            const existChartMonth = chartAmount.find(
                item =>
                    item.x ===
                    editDate.toLocaleString('en-EN', {
                        month: 'short',
                    })
            )

            if (existChartMonth) {
                editChartAmount(object)
            } else {
                deleteChartAmount(object)
                const newChartItem: IchartData = {
                    id: Math.random(),
                    x: editDate?.toLocaleString('en-EN', {
                        month: 'short',
                    }),
                    y: editAmount,
                }
                dispatch(setChart(newChartItem))
            }

            setIsEditingExpense(null)

            setIsEditTitleClick(false)
            setIsEditAmountClick(false)
            setIsEditDateClick(false)
        } else {
            setIsEditTextStart(false)
            setIsEditAmountStart(false)
            setIsEditDateStart(false)
        }
    }

    const deleteItemsHandler = (item: Iexpense) => {
        dispatch(deleteExpense(item))
        deleteChartAmount(item)
    }

    const editHandler = (id: string) => {
        setIsEditingExpense(id)

        // dispatch(editExpense(updatedExpense))
    }

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

    const editColor = '#efefef'

    return (
        <AnimatePresence>
            {expenses.map((item: Iexpense) => (
                <div key={item.id}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Paper
                            elevation={5}
                            key={item.id}
                            sx={{ marginBottom: '1rem' }}
                        >
                            {isEditingExpense === item.id ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexWrap: {
                                                xs: 'wrap',
                                                md: 'nowrap',
                                            },
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
                                            <CardActionArea
                                                sx={{
                                                    borderRadius: '10px',
                                                }}
                                                onClick={() =>
                                                    setIsEditDateClick(true)
                                                }
                                            >
                                                {isEditDateClick ? (
                                                    <LocalizationProvider
                                                        dateAdapter={
                                                            AdapterDateFns
                                                        }
                                                    >
                                                        <DatePicker
                                                            label='Date'
                                                            value={editDate}
                                                            onChange={
                                                                setEditDate
                                                            }
                                                            renderInput={(
                                                                params: any
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={
                                                                        !isEditDateStart
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                ) : (
                                                    <Paper
                                                        elevation={5}
                                                        sx={{
                                                            padding: 3,
                                                            textAlign: 'center',
                                                            width: '50px',
                                                            backgroundColor:
                                                                editColor,
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
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
                                                )}
                                            </CardActionArea>
                                        </CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flex: '1 1',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <CardActionArea
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                        backgroundColor:
                                                            editColor,
                                                        borderRadius: '10px',
                                                        padding: '1rem',
                                                    }}
                                                    onClick={() =>
                                                        setIsEditTitleClick(
                                                            true
                                                        )
                                                    }
                                                >
                                                    {isEditTitleClick ? (
                                                        <TextField
                                                            id='outlined-name'
                                                            value={editText}
                                                            label='Title'
                                                            type='text'
                                                            onChange={event =>
                                                                setEditText(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            error={
                                                                !isEditTextStart
                                                            }
                                                            placeholder={
                                                                'You didn`t write anything'
                                                            }
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant='body1'
                                                            component='div'
                                                            sx={{
                                                                flex: '1 1',
                                                            }}
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                    )}
                                                </CardActionArea>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <CardActionArea
                                                    sx={{
                                                        marginLeft: '2rem',
                                                        backgroundColor:
                                                            editColor,
                                                        borderRadius: '10px',
                                                        padding: '0.7rem',
                                                        textAlign: 'right',
                                                    }}
                                                    onClick={() =>
                                                        setIsEditAmountClick(
                                                            true
                                                        )
                                                    }
                                                >
                                                    {isEditAmountClick ? (
                                                        <TextField
                                                            id='outlined-name'
                                                            value={editAmount}
                                                            label='Amount, $'
                                                            type='number'
                                                            onChange={event =>
                                                                setEditAmount(
                                                                    Number(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            error={
                                                                !isEditAmountStart
                                                            }
                                                            placeholder={
                                                                'You didn`t write anything'
                                                            }
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant='h5'
                                                            component='div'
                                                        >
                                                            ${item.amount}
                                                        </Typography>
                                                    )}
                                                </CardActionArea>
                                            </Box>
                                        </Box>
                                        <CardActions>
                                            <Button
                                                className='buttons'
                                                onClick={() =>
                                                    submitEditExpense(item)
                                                }
                                            >
                                                confirm
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            ) : (
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
                                        <Typography
                                            variant='h6'
                                            component='div'
                                        >
                                            ${item.amount}
                                        </Typography>
                                    </Box>
                                    <CardActions>
                                        <IconButton
                                            aria-label='edit'
                                            onClick={() => editHandler(item.id)}
                                            sx={{ marginLeft: '8px' }}
                                        >
                                            <EditIcon color='primary' />
                                        </IconButton>
                                        <IconButton
                                            aria-label='delete'
                                            onClick={() =>
                                                deleteItemsHandler(item)
                                            }
                                        >
                                            <DeleteIcon color='primary' />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            )}
                        </Paper>
                    </motion.div>
                </div>
            ))}
        </AnimatePresence>
    )
}

export default ExpenseItem
