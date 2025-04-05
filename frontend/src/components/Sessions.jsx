import {useState, useEffect, memo, useRef} from 'react';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap';

import FormField from './FormField.jsx';

function SelectFromMap({object, fieldAlias, fieldName, map, setObject})
{
    const [field, setField] = useState(object[fieldName]?object[fieldName]:"");
    const options = [];
    for(const[id, name] of Object.entries(map))
    {
        options.push(
            <option key={id} value={id}>{name}</option>
        );
    }
    return (
        <Form.Select aria-label="Default select example" value={field} required  onChange={(e)=>{
            const value = parseInt(e.target.value);
            setField(value);
            object[fieldName] = value;
            const index = e.nativeEvent.target.selectedIndex;
            object[fieldAlias] = e.nativeEvent.target[index].text
            setObject(object);

        }}>
            <option value="">--Choose One--</option>
            {options}
        </Form.Select>
    );
}

function SessionFrequency({object, setObject})
{
    const [frequency, setFrequency] = useState(object.frequency);

    return(<Form.Select required value={frequency} onChange={(e)=>{
        setFrequency(e.target.value);
        object.frequency = e.target.value;
        setObject(object);

    }}>
        <option>--Choose one--</option>
        <option value="WEEKLY">WEEKLY</option>
        <option value="MONTHLY">MONTHLY</option>
    </Form.Select>);
}

function SessionModal({modal, setModal, isNewSession, sessionToEdit, sessions, setSessions, therapists, clients, setSessionToEdit})
{
    const handleClose = () => setModal(false);

    return (
        <>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNewSession?"New":"Edit"} Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalClientTherapist">
                            <Form.Label column={true} sm={2}>
                                Client
                            </Form.Label>
                            <Col>
                                <SelectFromMap map={clients} object={sessionToEdit} fieldName="idClient" fieldAlias="client" setObject={setSessionToEdit}/>
                            </Col>
                            <Form.Label column={true} sm={2}>
                                Therapist
                            </Form.Label>
                            <Col>
                                <SelectFromMap map={therapists} object={sessionToEdit} fieldName="idTherapist" fieldAlias="therapist" setObject={setSessionToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
                            <Form.Label column={true} sm={4}>
                                Date and Time
                            </Form.Label>
                            <Col>
                                <FormField type="datetime-local" object={sessionToEdit} fieldName="date"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDuration">
                            <Form.Label column={true} sm={2}>
                                Length
                            </Form.Label>
                            <Col>
                                <FormField object={sessionToEdit} fieldName="length"/>
                            </Col>
                            <Form.Label column={true} sm={2}>
                                Frequency
                            </Form.Label>
                            <Col>
                                <SessionFrequency object={sessionToEdit} setObject={setSessionToEdit}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        let method="PATCH";
                        if(isNewSession)
                        {
                            method = "POST";
                        }
                        fetch('http://localhost:3000/sessions', {
                            method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(sessionToEdit)
                        }).then((response)=>response.json())
                            .then((data)=>{
                                if(isNewSession)
                                {
                                    sessionToEdit.idSession = data.insertId;
                                    sessions.push(sessionToEdit);
                                }
                                setSessionToEdit(sessionToEdit);
                                setSessions(sessions);
                                handleClose();
                            })

                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function SessionRow({session, sessionToEdit, modal, setModal, setIsNewSession, setSessionToEdit, setSessions, sessions})
{
    let date = new Date(session.date);

    return (<Row>
        <Col>{session.client}</Col>
        <Col>{session.therapist}</Col>
        <Col>{date.toLocaleString()}</Col>
        <Col>{session.length}</Col>
        <Col>{session.frequency}</Col>
        <Col xs="1" className="text-end">
            <button className="btn btn-success btn-sm" onClick={(e)=>{
                setIsNewSession(false);
                setSessionToEdit(session);
                setModal(true);
            }}>&#9999;</button>
            <button className="btn btn-danger btn-sm" onClick={(e)=>{
                fetch(`http://localhost:3000/sessions/${session.idSession}`, {method: "DELETE"})
                    .then((response)=>response.json())
                    .then((data)=>{
                        setSessions(sessions.filter(s => s !== session));

                    })
            }}>&#128465;</button>
        </Col>
    </Row>)
}

function Sessions()
{
    const blankSession = {date:"", length:0, frequency:'', idClient:0, idTherapist:0}

    const [modal, setModal] = useState(false);
    const [isNewSession, setIsNewSession] = useState(false);
    const [sessionToEdit, setSessionToEdit]= useState(blankSession);
    const [sessions, setSessions]=useState([]);
    const [therapists, setTherapists]=useState([]);
    const [clients, setClients]=useState([]);


    useEffect(()=>{
        fetch("http://localhost:3000/sessions")
            .then((res) => {
                return res.json();
            }).then((data) => {
                for(let session of data.sessions)
                {
                    session.date = new Date(session.date).toISOString().slice(0,16);
                }

                setSessions(data.sessions);
                setClients(data.clients);
                setTherapists(data.therapists);
            });
    },[]);


    const sessionRows = [];
    sessions.forEach(session => {
        sessionRows.push(<SessionRow key={session.idSession} session={session} sessionToEdit={sessionToEdit} sessions={sessions} setSessions={setSessions} setSessionToEdit={setSessionToEdit} modal={modal} setModal={setModal} setIsNewSession={setIsNewSession}  />);
    });
    return(<>
        <SessionModal modal={modal} setModal={setModal} isNewSession={isNewSession} sessionToEdit={sessionToEdit} setSessionToEdit={setSessionToEdit} setSessions={setSessions} sessions={sessions} clients={clients} therapists={therapists} />
        <h2 className="text-center">Sessions</h2>
        <div className="container text-center">
        <Button variant="primary" onClick={()=>{
            setIsNewSession(true);
            setSessionToEdit(blankSession);
            setModal(true);
        }}>
            Add new session
            </Button>
        </div>
        <div className="container">
            <Row className="firstRow">
                <Col>Client</Col>
                <Col>Therapist</Col>
                <Col>Date</Col>
                <Col>Length</Col>
                <Col>Frequency</Col>
                <Col xs="1"></Col>
            </Row>
            {sessionRows}
        </div>
    </>);
}

export default Sessions;