import Controller from './Controller.class.js';

class TherapistController extends Controller
{
    static instance;

    async getAllTherapists(req, res)
    {
        this.query("SELECT * FROM therapist")
            .then((query)=>{
                res.json(query.results);
            }).catch((err)=>{
                console.error(err);
                res.status(500);
                res.json({error:"Query string failed"});
            });
    }

    async getTherapistById(req, res)
    {
        this.query(
            "SELECT * FROM therapist WHERE idTherapist = ? AND name = ?",
            [req.params.idTherapist, req.params.name]
        ).then((query)=>{
            res.json(query.results[0]);
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    async addTherapist(req, res)
    {
        console.log(req.body);
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
        }).catch((err)=>{
            console.error(err);
            res.status(500);
            res.json({error:"Query string failed"});
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
            res.status(500);
            res.json({error:"Malformed therapist"});
            return;
        }

        this.query(
            "UPDATE therapist SET "+updateSQL.join(", ")+" WHERE idTherapist=?",
            updateFields
        ).then((query)=>{
           res.json(query.results);
        }).catch((err)=>{
            console.log(err);
            res.status(500);
            res.json({error:"Query string failed"});
        });
    }

    async deleteTherapist(req, res)
    {
        this.query(
            "DELETE FROM therapist WHERE idTherapist = ?",
            [req.params.idTherapist]
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
            this.instance = new TherapistController();
        }
        return this.instance;
    }
}

export default TherapistController;