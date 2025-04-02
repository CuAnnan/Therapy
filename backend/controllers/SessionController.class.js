import Controller from './Controller.class.js';

class SessionController extends Controller
{
    static instance;

    getAllSessions()
    {

    }

    static getInstance()
    {
        if(!this.instance)
        {
            this.instance = new SessionController();
        }
        return this.instance;
    }
}

export default SessionController;