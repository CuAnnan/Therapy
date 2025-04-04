import {useState, useEffect} from 'react';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap';

import FormField from './FormField.jsx';

function SessionModal({modal, setModal, isNewSession, sessionToEdit, setSessionToEdit, sessions, setSessions})
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
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column={true} sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="name" object={sessionToEdit}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function SessionRow({session, sessionToEdit, modal, setModal, setIsNewSession, setSessionToEdit, setSessions})
{
    let date = new Date(session.date);
    return (<Row>
        <Col>{session.client}</Col>
        <Col>{session.therapist}</Col>
        <Col>{date.toLocaleString()}</Col>
        <Col>{session.length}</Col>
        <Col>{session.frequency}</Col>
        <Col xs="1" className="text-end">
            <button className="btn btn-success btn-sm" onClick={(e)=>{}}>&#9999;</button>
            <button className="btn btn-danger btn-sm" onClick={(e)=>{}}>&#128465;</button>
        </Col>
    </Row>)
}

function Sessions()
{
    const [sessions, setSessions] = useState([]);
    const [modal, setModal] = useState(false);
    const [isNewSession, setIsNewSession] = useState(false);
    const [sessionToEdit, setSessionToEdit] = useState({});


    useEffect(()=>{
        fetch("http://localhost:3000/sessions")
            .then((res)=>{
                return res.json();
            }).then((data)=>{
                setSessions(data);
            });
    },[]);

    const sessionRows = [];
    sessions.forEach(session => {
        sessionRows.push(<SessionRow key={session.idSession} session={session} sessionToEdit={sessionToEdit} modal={modal} setModal={setModal} setIsNewSession={setIsNewSession} setSessionToEdit={setSessionToEdit} setSessions={setSessions} />);
    });

    return(<>
        <SessionModal modal={modal} setModal={setModal} isNewSession={isNewSession} sessionToEdit={sessionToEdit} setSessionToEdit={setSessionToEdit} session={sessions} setSessions={setSessions}/>
        <h2 className="text-center">Sessions</h2>
        <div className="container text-center">
        <Button variant="primary" onClick={()=>{
            setIsNewSession(true);
            setModal(true);
            setSessionToEdit({date:"", length:0, frequency:'WEEKLY', idClient:0, idTherapist:0});
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