import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Form, Grid, IconButton, Input, Row } from 'rsuite'
import { CreateNewList, DeleteTodoList, GetAllTodoList } from '../utils/queries'
import FormModal from '../components/modal/formModal'
import { HiPlus } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import moment from 'moment'

const Dashboard = () => {
    // ==================== Variables & useStates ====================
    const [todoCards, setTodoCards] = useState([])
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        date: undefined,
        note: '',
        cardbg: '#fff'
    })
    // ========================== APIs Call ==========================
    const GetTodoLists = async () => {
        let res = await GetAllTodoList();
        if (res?.status === 'success') {
            setTodoCards(res?.data)
        } else {
            console.log(res?.message)
        }
    }
    const formDataSubmit = async () => {
        let res = await CreateNewList(formData);
        if (res?.status === 'success') {
            setFormData({
                title: '',
                date: undefined,
                note: '',
                cardbg: '#fff'
            })
            setShow(false)
            GetTodoLists();
        } else {
            console.log("Error-", res?.message)
        }
    }
    const RemoveList = async (id) => {
        let res = await DeleteTodoList(id);
        if (res?.status === 'success') {
            console.log(res?.message)
            GetTodoLists();
        } else {
            console.log(res?.message)
        }
    }
    // ==================== Functions & useEffects ===================
    const handleClose = () => setShow(false)
    const handleFormData = (key, value) => {
        let newFormData = { ...formData }
        if (key === "time") {
            newFormData.date = value;
            setFormData(newFormData);
        } else {
            newFormData[key] = value;
            setFormData(newFormData);
        }
    }
    useEffect(() => {
        GetTodoLists()
    }, [])
    // ===============================================================
    return (
        <Grid fluid style={{ height: '100vh', position: 'relative' }}>
            <Row style={{ backgroundColor: '#8176b4', paddingInline: '32px', textAlign: 'center', position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1 }}>
                <Col xs={24}>
                    <h1 style={{ color: '#fff' }}>TO DO LIST APP</h1>
                </Col>
            </Row>
            <Row style={{ backgroundColor: '#c5c5c5', paddingInline: '32px', minHeight: '100%' }}>
                <Col xs={24} >
                    {todoCards && todoCards?.map((card, id) => {
                        let cardDate = new Date(card?.date).toDateString()
                        let Formate24Time = new Date(card?.date).toLocaleTimeString().split(':')
                        let Formate12Time;
                        if (Formate24Time[0] > 12) {
                            Formate12Time = `${Formate24Time[0] - 12}:${Formate24Time[1]} PM`
                        } else {
                            Formate12Time = `${Formate24Time[0]}:${Formate24Time[1]} AM`
                        }
                        return (
                            <Col key={id} xs={6} style={{ width: '24%', backgroundColor: card?.cardbg, borderRadius: '12px', paddingInline: '12px', marginInline: '7px', marginTop: '16px' }}>
                                <IoCloseOutline size={20} style={{ position: 'absolute', top: 8, right: 10, cursor: 'pointer' }} onClick={() => RemoveList(card?.id)} />
                                <Col xs={24} as='h2' style={{ marginBottom: '0px', minHeight: '4rem', lineHeight: '30px' }}>{card?.title}</Col>
                                <Col xs={12} as='p'>{cardDate}</Col>
                                <Col xs={12} as='p' style={{ textAlign: 'end' }}>{Formate12Time}</Col>
                            </Col>
                        )
                    })}

                </Col>
            </Row>
            <Row style={{ backgroundColor: '#8176b4', textAlign: 'end', padding: '10px 32px', position: 'sticky', bottom: 0, left: 0, right: 0 }}>
                <IconButton style={{ position: 'relative', top: -35 }} title='Add New' icon={<HiPlus size={25} />} circle size="lg" onClick={() => setShow(true)} />
            </Row>
            {/* START================= Add new form modal ======================= */}
            <FormModal
                title="To Do List"
                open={show}
                onClose={handleClose}
                style={{ backgroundColor: '#000000a1' }}
            >
                <Grid fluid>
                    <Row style={{
                        backgroundColor: formData?.cardbg,
                        borderRadius: '12px',
                        paddingInline: '18px',
                        marginBottom: '16px',
                    }}>
                        <Col xs={24} as='h2' style={{ marginBottom: '0px', minHeight: '4rem', lineHeight: '30px' }}>
                            {formData?.title || 'Please Enter Title'}
                        </Col>
                        <Col xs={12} as='p'>
                            {moment(formData?.date).format("DD MMM yyyy") || 'Wed Jul 12 2023'}
                        </Col>
                        <Col xs={12} as='p' style={{ textAlign: 'end' }}>
                            {moment(formData?.date).format("h:mm A") || '7:45 PM'}
                        </Col>
                    </Row>
                    <Row style={{ overflow: 'hidden' }}>
                        <Form style={{
                            overflow: 'auto',
                            maxHeight: '349px',
                            paddingTop: '18px',
                            paddingBottom: '8px',
                            paddingRight: '0px',
                            marginRight: '-19px',
                            marginLeft: '-5px'
                        }}>
                            <Col xs={24}>
                                <Form.Group controlId="title">
                                    <Form.ControlLabel>Title</Form.ControlLabel>
                                    <Input
                                        name="title"
                                        placeholder='Title'
                                        size='lg'
                                        value={formData?.title}
                                        onChange={(e) => handleFormData('title', e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="date">
                                    <Form.ControlLabel>Date :</Form.ControlLabel>
                                    <DatePicker
                                        name="date"
                                        placeholder="Select Date"
                                        size='lg'
                                        block
                                        format='dd MMMM yyyy'
                                        value={formData?.date}
                                        onChange={(e) => handleFormData('date', e)}
                                        oneTap
                                    />
                                </Form.Group>
                                <Form.Group controlId="time">
                                    <Form.ControlLabel>Time :</Form.ControlLabel>
                                    <DatePicker
                                        name="time"
                                        placeholder="Select Time"
                                        size='lg'
                                        block
                                        format='hh:mm aa'
                                        showMeridian
                                        value={formData?.date}
                                        onChange={(e) => handleFormData('time', e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="note">
                                    <Form.ControlLabel>Note</Form.ControlLabel>
                                    <Input
                                        name="note"
                                        placeholder='Please enter note...'
                                        size='lg'
                                        as="textarea"
                                        rows={5}
                                        value={formData?.note}
                                        onChange={(e) => handleFormData('note', e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Form>
                    </Row>
                    <Row>
                        <Button block size='lg' style={{ padding: '12px', fontSize: '18px', backgroundColor: '#673AB7', color: '#fff', marginTop: '16px' }} onClick={formDataSubmit}>
                            Submit
                        </Button>
                    </Row>
                </Grid>

            </FormModal >
            {/* ====================== Add new form modal ====================END */}
        </Grid >
    )
}

export default Dashboard;