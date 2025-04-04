import {useState} from "react";
import {Form} from 'react-bootstrap';

function FormField({fieldName, object, isNumeric})
{
    const [field, setField] = useState(object[fieldName]?object[fieldName]:"");

    return (<Form.Control required value={field} onChange={(e) => {
        let value = e.target.value;
        if(isNumeric)
        {
            value = parseInt(value);
        }
        setField(value);
        object[fieldName] = value;
    }}/>);
}

export default FormField;