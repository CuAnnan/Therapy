import Controller from "./Controller.class.js";

class ClientController extends Controller
{
    static instance;

    async getAllClients(req, res)
    {
        this.query(
            "SELECT * FROM client"
        ).then((query) => {
            res.json(query.results)
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async getClientById(req, res)
    {
        this.query(
            "SELECT * FROM client WHERE idClient = ? AND name = ?",
            [req.params.idClient, req.params.name]
        ).then((query) => {
           res.json(query.results[0])
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async addClient(req, res)
    {
        this.query(
            "INSERT INTO client (name, email, phoneNumber) VALUES (?, ?, ?)",
            [req.body.name, req.body.email, req.body.phoneNumber]
        ).then((query) => {
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async updateClient(req, res)
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
            this.sendErrorResponse(res, "Malformed client");
            return;
        }

        this.query(
            "UPDATE client SET "+updateSQL.join(", ")+" WHERE idClient=?",
            updateFields
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async deleteClient(req, res)
    {
        this.query(
            "DELETE FROM client WHERE idClient = ?",
            [req.params.idClient]
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async getClientIdsAndNames(req, res)
    {
        this.query(
            "SELECT idClient, name FROM client"
        ).then((query)=>{
            let map = {};
            for(let result of query.results)
            {
                map[result.idClient] = result.name;
            }
            res.json(map);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
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