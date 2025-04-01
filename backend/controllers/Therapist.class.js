import Controller from './Controller.class.js';

class TherapistController extends Controller
{
    static instance;

    constructor()
    {
        super();
    }

    async getAllTherapists(req, res)
    {

    }

    static getInstance()
    {
        this.instance = new TherapistController();
        return this.instance;
    }
}

export default TherapistController;