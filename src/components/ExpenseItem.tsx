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
    setChartSame,
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
        if (Number(editAmount) > 0) {
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
                                  y:
                                      exist.y -
                                      object.amount +
                                      Number(editAmount),
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

        Number(editAmount) > 0
            ? setIsEditAmountStart(true)
            : setIsEditAmountStart(false)

        editDate !== null ? setIsEditDateStart(true) : setIsEditDateStart(false)

        if (
            editText.trim().length > 0 &&
            Number(editAmount) > 0 &&
            editDate !== null
        ) {
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

            console.log(existChartMonth)

            if (existChartMonth) {
                deleteChartAmount(object)

                editChartAmount(object)
            } else {
                deleteChartAmount(object)
                const newChartItem: IchartData = {
                    id: Math.random(),
                    x: editDate?.toLocaleString('en-EN', {
                        month: 'short',
                    }),
                    y: Number(editAmount),
                }
                dispatch(setChart(newChartItem))
            }

            setIsEditingExpense(null)

            setIsEditTitleClick(false)
            setIsEditAmountClick(false)
            setIsEditDateClick(false)
        } else {
            editText.trim().length <= 0 && setIsEditTextStart(false)
            Number(editAmount) <= 0 && setIsEditAmountStart(false)
            editDate == null && setIsEditDateStart(false)
        }
    }

    const deleteItemsHandler = (item: Iexpense) => {
        dispatch(deleteExpense(item))
        deleteChartAmount(item)
    }

    const editHandler = (item: Iexpense) => {
        setIsEditingExpense(item.id)

        setEditText(item.title)
        setEditAmount(Number(item.amount))
        setEditDate(item.date)
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
                                // code after edit

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                xs: 'column',
                                                sm: 'row',
                                            },
                                            width: { xs: '100%' },
                                            justifyContent: 'space-between',
                                            minWidth: 275,
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                margin: {
                                                    xs: '1rem auto',
                                                    sm: '1rem',
                                                },
                                                backgroundColor: editColor,
                                                padding: '0.7rem',
                                                borderRadius: '10px',
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
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    {isEditDateClick ? (
                                                        <LocalizationProvider
                                                            dateAdapter={
                                                                AdapterDateFns
                                                            }
                                                        >
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                }}
                                                                transition={{
                                                                    duration: 0.2,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                }}
                                                            >
                                                                <DatePicker
                                                                    inputFormat='dd/MM/yyyy'
                                                                    label='Date'
                                                                    value={
                                                                        editDate
                                                                    }
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
                                                            </motion.div>
                                                        </LocalizationProvider>
                                                    ) : (
                                                        <Paper
                                                            elevation={5}
                                                            sx={{
                                                                padding: 3,
                                                                textAlign:
                                                                    'center',
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
                                                </motion.div>
                                            </CardActionArea>
                                        </CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: {
                                                    xs: 'center',
                                                    sm: 'space-between',
                                                },
                                                alignItems: 'center',
                                                flex: '1 1',
                                                padding: { xs: '0 1rem' },
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
                                                        padding: '0.7rem',
                                                    }}
                                                    onClick={() =>
                                                        setIsEditTitleClick(
                                                            true
                                                        )
                                                    }
                                                >
                                                    {isEditTitleClick ? (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                            }}
                                                        >
                                                            <TextField
                                                                id='outlined-name'
                                                                value={editText}
                                                                label='Title'
                                                                type='text'
                                                                onChange={event =>
                                                                    setEditText(
                                                                        event
                                                                            .target
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
                                                        </motion.div>
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
                                                        marginLeft: {
                                                            xs: '0.5rem',
                                                            sm: '2rem',
                                                        },
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
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                            }}
                                                        >
                                                            <TextField
                                                                id='outlined-name'
                                                                value={
                                                                    editAmount
                                                                }
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
                                                        </motion.div>
                                                    ) : (
                                                        <Typography
                                                            variant='body1'
                                                            component='div'
                                                        >
                                                            ${item.amount}
                                                        </Typography>
                                                    )}
                                                </CardActionArea>
                                            </Box>
                                        </Box>
                                        <CardActions
                                            sx={{
                                                justifyContent: {
                                                    xs: 'center',
                                                },
                                            }}
                                        >
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
                                // code before edit

                                <Card
                                    sx={{
                                        display: 'flex',
                                        justifyContent: {
                                            xs: 'center',
                                            sm: 'space-between',
                                        },
                                        minWidth: 275,
                                        flexWrap: { xs: 'wrap' },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: { xs: '33%', sm: '15%' },
                                        }}
                                    >
                                        <Paper
                                            elevation={5}
                                            sx={{
                                                padding: {
                                                    xs: '0.5rem',
                                                    sm: 3,
                                                },
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
                                            marginRight: { xs: '1rem' },
                                            width: { xs: '33%', sm: '70%' },
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            component='div'
                                            sx={{
                                                flex: '1 1',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            component='div'
                                        >
                                            ${item.amount}
                                        </Typography>
                                    </Box>
                                    <CardActions
                                        sx={{ width: { xs: '33%', sm: '15%' } }}
                                    >
                                        <IconButton
                                            aria-label='edit'
                                            onClick={() => editHandler(item)}
                                            sx={{
                                                marginLeft: '8px',
                                            }}
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
