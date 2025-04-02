import Controller from "./Controller.class.js";

class ClientController extends Controller
{
    static instance;

    getAllClients(req, res)
    {

    }

    getClientById(req, res)
    {

    }

    addClient(req, res)
    {

    }

    updateClient(req, res)
    {

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