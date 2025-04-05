import Controller from './Controller.class.js';
import ClientController from "./ClientController.class.js";
import TherapistController from "./TherapistController.class.js";

class SessionController extends Controller
{
    static instance;

    async getAllSessions()
    {
        const query = await this.query(
            "SELECT " +
                            "s.idSession, s.date, s.length, s.frequency," +
                            "c.idClient, c.name as client, t.idTherapist, t.name as therapist " +
                        "FROM " +
                            "session s " +
                            "LEFT JOIN client c USING (idClient) " +
                            "LEFT JOIN therapist t USING (idTherapist)"
        );
        return query.results;
    }

    async getAllSessionData(req, res)
    {
        const clientController = ClientController.getInstance();
        const therapistController = TherapistController.getInstance()
        res.json({
            clients:await clientController.getClientIdsAndNames(),
            therapists:await therapistController.getTherapistIdAndNames(),
            sessions:await this.getAllSessions(),
        });
    }

    async addSession(req, res)
    {
        this.query(
            "INSERT INTO session (idClient, idTherapist, date, length, frequency) VALUES (?, ?, ?, ?, ?)",
            [req.body.idClient, req.body.idTherapist, new Date(req.body.date), req.body.length, req.body.frequency]
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async deleteSession(req, res)
    {
        this.query(
            "DELETE FROM session WHERE idSession = ?",
            [req.params.idSession]
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
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
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
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
        updateFields.push(req.body.idSession);

        this.query(
            "UPDATE session SET "+updateSQL.join(", ")+" WHERE idSession=?",
            updateFields
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
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