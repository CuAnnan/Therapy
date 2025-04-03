import mysql from 'mysql';
import conf from '../conf.js';



class Controller
{
    static db;
    static instance;
    static inTransaction;

    static {
        this.db = mysql.createConnection(conf.db);
        this.db.connect();
    }

    static getInstance()
    {
        throw new Error("getInstance method not implemented.");
    }

    query(sqlStatement, fields)
    {
        return new Promise((resolve, reject)=>{
            let stmt = Controller.db.query(sqlStatement, fields, (err, results)=>{
                let query = {
                    sql:stmt.sql,
                    qry:stmt,
                    results:[],
                    hasResults:false
                }

                if(err)
                {
                    console.log("This is the problem");
                    reject(err);
                }
                if(results)
                {
                    query.results = results;
                    query.hasResults = results.length > 0;
                }

                resolve(query);
            });
        });
    }

    async beginTransaction()
    {
        await this.query("START TRANSACTION");
    }

    async commit()
    {
        await this.query("COMMIT");
    }

    sendErrorResponse(res, message="Query string failed")
    {
        console.error(err);
        res.status(500);
        res.json({error:message});
    }

}
export default Controller;