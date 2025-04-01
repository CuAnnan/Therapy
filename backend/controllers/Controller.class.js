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

    async query(sqlStatement, fields)
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

}
export default Controller;