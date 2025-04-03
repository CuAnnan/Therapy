import {useState, useEffect} from 'react';

function TherapistRow({therapist, therapists, setTherapists})
{

    return(<div className="row">
        <div className="col">{therapist.title} {therapist.name}</div>
        <div className="col-3">{therapist.email}</div>
        <div className="col">{therapist.location}</div>
        <div className="col text-end">{therapist.yearsOfPractice}</div>
        <div className="col-1 text-end">{therapist.availability?"Yes":"No"}</div>
        <div className="col-1 text-end">
            <button className="btn btn-success btn-sm">&#9999;</button>
            <button className="btn btn-danger btn-sm" onClick={(e)=>{
                fetch(
                    `http://localhost:3000/therapists/${therapist.idTherapist}`,
                    {method: 'DELETE'}
                ).then((res)=> {
                        return res.json()
                }).then((data)=>{
                    console.log(data);
                    setTherapists(therapists.filter(t => t !== therapist));
                });

            }}>&#128465;</button>
        </div>
    </div>);
}

function Therapists()
{
    const [therapists, setTherapists] = useState([]);
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
        therapistRows.push(<TherapistRow key={therapist.idTherapist} therapist={therapist} therapists={therapists} setTherapists={setTherapists}/>);
    });

    return(<>
        <h2 className="text-center">Therapists</h2>
        <div className="container">
            <div className="row">
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