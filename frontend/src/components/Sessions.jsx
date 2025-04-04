import {useState, useEffect} from 'react';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap';

import FormField from './FormField.jsx';

function SessionRow({session, sessionToEdit, modal, setModal, setIsNewSession, setSessionToEdit, setSessions})
{
    let date = new Date(session.date);
    console.log(date);

    return (<Row>
        <Col>{session.client}</Col>
        <Col>{session.therapist}</Col>
        <Col>{date.toLocaleString()}</Col>
        <Col>{session.length}</Col>
        <Col>{session.frequency}</Col>
        <Col xs="1"></Col>
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
                console.log(data);
                setSessions(data);
            });
    },[]);

    const sessionRows = [];
    sessions.forEach(session => {
        sessionRows.push(<SessionRow key={session.idSession} session={session} sessionToEdit={sessionToEdit} modal={modal} setModal={setModal} setIsNewSession={setIsNewSession} setSessionToEdit={setSessionToEdit} setSessions={setSessions} />);
    });

    return(<><h2 className="text-center">Sessions</h2>
    <div className="container text-center">
        <Button variant="primary" onClick={()=>{}}>
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
    </div></>);
}

export default Sessions;