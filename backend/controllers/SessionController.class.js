import Controller from './Controller.class.js';

class SessionController extends Controller
{
    static instance;

    async getAllSessions()
    {
        this.query(
            "SELECT * FROM session"
        ).then((query)=>{
            res.json(query.results);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    async getSessionById(req, res)
    {
        this.query(
            "SELECT " +
                            "s.idSession, s.date, s.length, s.frequency," +
                            "c.idClient, c.name as client, t.idTherapist, t.name as therapist " +
                        "FROM " +
                            "session s " +
                            "LEFT JOIN client c ON (idClient) " +
                            "LEFT JOIN therapist t ON (idTherapist) " +
                        "WHERE " +
                            "s.idSession = ?"
        )
        .then((query)=>{
            res.json(query.results[0])
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    async updateSession(req, res)
    {
        let fields = ["idClient", "idTherapist", "date", "length", "frequency"];
        let updateSQL = [];
        let updateFields = [];

        for(let field of fields)
        {
            if(req.body[field])
            {
                updateSQL.push(`${field}=?`);
                updateFields.push(req.body[field]);
            }
        }

        this.query(
            "UPDATE sessions SET "+updateSQL.join(", ")+" WHERE idSessions=?",
            updateFields
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
            this.instance = new SessionController();
        }
        return this.instance;
    }
}

export default SessionController;