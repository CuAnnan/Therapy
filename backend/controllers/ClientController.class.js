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
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    getClientById(req, res)
    {
        this.query(
            "SELECT * FROM client WHERE idClient = ? AND name = ?",
            [req.params.idClient, req.params.name]
        ).then((query) => {
           res.json(query.results[0])
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    addClient(req, res)
    {
        this.query(
            "INSERT INTO client (name, email, phoneNumber) VALUES (?, ?, ?)",
            [req.body.name, req.body.email, req.body.phoneNumber]
        ).then((query) => {
            res.json(query.results[0]);
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    updateClient(req, res)
    {
        let fields = ["name", "email", "phoneNumber"];
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
            res.json({error:"Malformed client"});
            return;
        }

        this.query(
            "UPDATE client SET "+updateSQL.join(", ")+" WHERE idClient=?",
            updateFields
        ).then((query)=>{
            res.json(query.results);
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    deleteClient(req, res)
    {
        this.query(
            "DELETE FROM client WHERE idClient = ?",
            [req.params.idClient]
        ).then((query)=>{
            res.json(query.results);
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
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