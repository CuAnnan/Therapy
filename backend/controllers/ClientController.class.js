import Controller from "./Controller.class.js";

class ClientController extends Controller
{
    static instance;

    getAllClients(req, res)
    {
        this.query(
            "SELECT * from client"
        ).then((query) => {
            res.json(query.results)
        });
    }

    getClientById(req, res)
    {
        this.query(
            "SELECT * FROM client WHERE idClient = ? AND name = ?",
            [req.params.idClient, req.params.name]
        ).then((query) => {
           res.json(query.results[0])
        });
    }

    addClient(req, res)
    {
        this.query(
            "INSERT INTO client (name, email, phoneNumber, frequency) VALUES (?, ?, ?, ?)",
            [req.body.name, req.body.email, req.body.phoneNumber, req.body.frequency]
        ).then((query) => {
            res.json(query.results[0]);
        });
    }

    updateClient(req, res)
    {
        let fields = ["name", "email", "phoneNumber", "frequency"];
        let updateSQL = [];
        let updateFields = [];
        for(let field of fields)
        {
            if(req.body[field])
            {
                updateSQL.push(`${field}=?`)
                updateFields.push(req.body[field]);
            }
        }
        updateFields.push(req.body.idClient);
        if(!req.body.idClient || updateSQL.length === 0)
        {
            res.status(500);
            res.json({error:"Malformed therapist"});
            return;
        }

        this.query(
            "UPDATE client SET "+updateSQL.join(" ")+" WHERE idClient=?",
            updateFields
        ).then((query)=>{
            res.json(query.results[0]);
        });
    }

    deleteClient(req, res)
    {

    }

    static getInstance()
    {
        if(!this.instance)
        {
            this.instance = new ClientController();
        }
        return this.instance;
    }
}

export default ClientController;