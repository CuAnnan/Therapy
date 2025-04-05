import {useEffect, useState} from "react";
import {Button, Modal, Row, Col, Form} from 'react-bootstrap';
import FormField from './FormField.jsx';


function ClientModal({modal, setModal, isNewClient, clientToEdit, setClientToEdit, clients, setClients})
{
    const handleClose = () => setModal(false);

    return (
        <>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNewClient?"New":"Edit"} Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column={true} sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="name" object={clientToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column={true} sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="email" object={clientToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
                            <Form.Label column={true} sm={2}>
                                Phone Number
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="phoneNumber" object={clientToEdit}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        let method = "PATCH";
                        if(isNewClient)
                        {
                            method="POST";
                        }
                        fetch(
                            'http://localhost:3000/clients/',
                            {
                                method,
                                headers: {
                                    'Content-Type':'application/json',
                                    'Accept':'application/json'
                                },
                                body:JSON.stringify(clientToEdit)
                            }
                        )
                            .then(res => res.json())
                            .then(data => {
                                if(isNewClient)
                                {
                                    clientToEdit.idClient = data.insertId;
                                    clients.push(clientToEdit);
                                    setClients(clients);
                                }
                                setClientToEdit(clientToEdit);
                                handleClose();
                            });
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ClientRow({client, clients, setClients, setModal, setIsNewClient, setClientToEdit})
{
    const handleShow = () => {
        setIsNewClient(false);
        setClientToEdit(client);
        setModal(true);
    }

    return (<Row>
        <Col>{client.name}</Col>
        <Col>{client.email}</Col>
        <Col>{client.phoneNumber}</Col>
        <Col xs="1">
            <button className="btn btn-success btn-sm" onClick={handleShow}>&#9999;</button>
            <button className="btn btn-danger btn-sm" onClick={(e)=>{
                fetch(
                    `http://localhost:3000/clients/${client.idClient}`,
                    {method: 'DELETE'}
                ).then((res)=> {
                    return res.json()
                }).then((data)=>{
                    setClients(clients.filter(c => c !== client));
                });

            }}>&#128465;</button>
        </Col>
    </Row>);
}

function Clients()
{
    const [clients, setClients] = useState([]);
    const [modal, setModal] = useState(false);
    const [isNewClient, setIsNewClient] = useState(false);
    const [clientToEdit, setClientToEdit] = useState({});

    useEffect(()=>{
        fetch("http://localhost:3000/clients")
            .then((res)=>{
                return res.json();
            }).then((data)=>{
                setClients(data);
            });
    },[]);

    const clientRows = [];

    clients.forEach((client)=>{
        clientRows.push(<ClientRow key={client.idClient} client={client} clients={clients} setClients={setClients} setClientToEdit={setClientToEdit} setModal={setModal} setIsNewClient={setIsNewClient}/>);
    });
    //modal, setModal, isNewClient, clientToEdit, setClientToEdit, clients, setClients
    return(<>
        <ClientModal modal={modal} setModal={setModal} isNewClient={isNewClient} clientToEdit={clientToEdit} setClientToEdit={setClientToEdit} clients={clients} setClients={setClients} />
        <h2 className="text-center">Clients</h2>
        <div className="container text-center">
            <Button variant="primary" onClick={()=>{
                setIsNewClient(true);
                setClientToEdit({name:"", email:"", phoneNumber:""});
                setModal(true);
            }}>
                Add new client
            </Button>
        </div>
        <div className="container">
            <Row className="firstRow">
                <Col>Client</Col>
                <Col>Email</Col>
                <Col>Phone number</Col>
                <Col xs="1"></Col>
            </Row>

            {clientRows}
        </div>
    </>);

}

export default Clients;