import Controller from './Controller.class.js';

class TherapistController extends Controller
{
    static instance;

    async getAllTherapists(req, res)
    {
        this.query("SELECT * FROM therapist")
        .then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async getTherapistById(req, res)
    {
        this.query(
            "SELECT * FROM therapist WHERE idTherapist = ? AND name = ?",
            [req.params.idTherapist, req.params.name]
        ).then((query)=>{
            res.json(query.results[0]);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async addTherapist(req, res)
    {

        this.query(
            "INSERT INTO therapist " +
                            "(title, name, email, location, yearsOfPractice, availability) " +
                        "VALUES " +
                            "(?, ?, ? ,?, ?, ?)",
                  [
                            req.body.title, req.body.name, req.body.email,
                            req.body.location, req.body.yearsOfPractice, req.body.availability
                        ],
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async updateTherapist(req, res)
    {
        let fields = ["title", "name", "email", "location", "yearsOfPractice", "availability"];
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
        updateFields.push(req.body.idTherapist);
        if(!req.body.idTherapist || updateSQL.length === 0)
        {
            this.sendErrorResponse(res, "Malformed therapist");
            return;
        }

        this.query(
            "UPDATE therapist SET "+updateSQL.join(", ")+" WHERE idTherapist=?",
            updateFields
        ).then((query)=>{
           res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async deleteTherapist(req, res)
    {
        this.query(
            "DELETE FROM therapist WHERE idTherapist = ?",
            [req.params.idTherapist]
        ).then((query)=>{
            res.json(query.results);
        }).catch((e)=>{
            this.sendErrorResponse(res, e.message);
        });
    }

    async getTherapistIdAndNames()
    {
        let query = await this.query(
            "SELECT idTherapist, name FROM therapist"
        );
        let map = {};
        for(let result of query.results)
        {
            map[result.idTherapist] = result.name;
        }
        return map;
    }

    static getInstance()
    {
        if(!this.instance)
        {
            this.instance = new TherapistController();
        }
        return this.instance;
    }
}

export default TherapistController;