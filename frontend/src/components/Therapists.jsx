import {useState, useEffect} from 'react';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap';

import FormField from './FormField.jsx';

function TherapistField({therapist, fieldName, isNumber})
{
    const [field, setField] = useState(therapist?therapist[fieldName]:"");

    return (<Form.Control required value={field} onChange={(e)=>{
        let value = e.target.value;
        if(isNumber)
        {
            value = parseInt(value);
        }
        setField(value);
        therapist[fieldName] = value;
    }}/>);
}


function NewTherapistModal({modal, setModal, isNewTherapist, therapistToEdit, setTherapistToEdit, therapists, setTherapists})
{
    const handleClose = () => setModal(false);
    const [isAvailable, setIsAvailable] = useState(therapistToEdit.availability);
    return (
        <>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNewTherapist?"New":"Edit"} Therapist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                            <Form.Label column={true} sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="title" object={therapistToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column={true} sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="name" object={therapistToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column={true} sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <TherapistField fieldName="email" therapist={therapistToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
                            <Form.Label column={true} sm={2}>
                                Location
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="location" object={therapistToEdit}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalYearsOfPractice">
                            <Form.Label column={true} sm={2}>
                                Years of Practice
                            </Form.Label>
                            <Col sm={10}>
                                <FormField fieldName="yearsOfPractice" object={therapistToEdit} isNumber={true}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAvailable">
                            <Form.Label column={true} sm={2}>
                                Available
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="therapistAvailable"
                                    id="therapistAvailableYes"
                                    checked={isAvailable===1}
                                    onChange={(e)=>{
                                        setIsAvailable(1);
                                        therapistToEdit.availability = 1;
                                    }}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="therapistAvailable"
                                    id="therapistAvailableNo"
                                    value="0"
                                    checked={isAvailable!==1}
                                    onChange={(e)=>{
                                        setIsAvailable(0);
                                        therapistToEdit.availability = 0;
                                    }}
                                />
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
                        if(isNewTherapist)
                        {
                            method="POST";
                        }
                        fetch(
                            'http://localhost:3000/therapists/',
                            {
                                method,
                                headers: {
                                    'Content-Type':'application/json',
                                    'Accept':'application/json'
                                },
                                body:JSON.stringify(therapistToEdit)
                            }
                        )
                            .then(res => res.json())
                            .then(data => {
                                therapistToEdit.idTherapist = data.insertId;
                                if(isNewTherapist)
                                {
                                    therapists.push(therapistToEdit);
                                }
                                setTherapists(therapists);
                                setTherapistToEdit(therapistToEdit);
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

function TherapistRow({therapist, therapists, setTherapists, setModal, setIsNewTherapist, setTherapistToEdit})
{
    const handleShow = () => {
        setIsNewTherapist(false);
        setTherapistToEdit(therapist);
        setModal(true);
    }


    return(<div className="row">
        <div className="col">{therapist.title} {therapist.name}</div>
        <div className="col-3">{therapist.email}</div>
        <div className="col">{therapist.location}</div>
        <div className="col text-end">{therapist.yearsOfPractice}</div>
        <div className="col-1 text-end">{therapist.availability?"Yes":"No"}</div>
        <div className="col-1 text-end">
            <button className="btn btn-success btn-sm" onClick={handleShow}>&#9999;</button>
            <button className="btn btn-danger btn-sm" onClick={(e)=>{
                fetch(
                    `http://localhost:3000/therapists/${therapist.idTherapist}`,
                    {method: 'DELETE'}
                ).then((res)=> {
                        return res.json()
                }).then((data)=>{
                    setTherapists(therapists.filter(t => t !== therapist));
                });

            }}>&#128465;</button>
        </div>
    </div>);
}

function Therapists()
{
    const [therapists, setTherapists] = useState([]);
    const [modal, setModal] = useState(false);
    const [isNewTherapist, setIsNewTherapist] = useState(false);
    const [therapistToEdit, setTherapistToEdit] = useState({});

    useEffect(()=>{
        fetch("http://localhost:3000/therapists")
            .then((res)=>{
                return res.json();
            }).then((data)=>{
                setTherapists(data);
            });
    },[]);

    const therapistRows = [];
    therapists.forEach((therapist)=>{
        therapistRows.push(<TherapistRow key={therapist.idTherapist} therapist={therapist} therapists={therapists} setTherapists={setTherapists} setModal={setModal} setIsNewTherapist={setIsNewTherapist} setTherapistToEdit={setTherapistToEdit}/>);
    });

    return(<>
        <NewTherapistModal modal={modal} setModal={setModal} isNewTherapist={isNewTherapist} therapistToEdit={therapistToEdit} setTherapistToEdit={setTherapistToEdit} therapists={therapists} setTherapists={setTherapists}/>
        <h2 className="text-center">Therapists</h2>
        <div className="container text-center">
            <Button variant="primary" onClick={()=>{
                setIsNewTherapist(true);
                setTherapistToEdit({title:"", name:"", location:"", availability:0, yearsOfPractice:"", email:""});
                setModal(true);
            }}>
                Add new therapist
            </Button>
        </div>
        <div className="container">
            <div className="row firstRow">
                <div className="col">Therapist</div>
                <div className="col-3">Email</div>
                <div className="col">Location</div>
                <div className="col text-end">Years of Practice</div>
                <div className="col-1 text-end">Available</div>
                <div className="col-1"></div>
            </div>
            {therapistRows}
        </div>
    </>);

}

export default Therapists;