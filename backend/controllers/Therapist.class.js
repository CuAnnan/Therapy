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
        this.query("SELECT * FROM therapist")
            .then((data)=>{
                res.json(data);
            });
    }

    static getInstance()
    {
        this.instance = new TherapistController();
        return this.instance;
    }
}

export default TherapistController;