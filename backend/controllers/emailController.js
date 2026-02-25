const pool = require('../config/db');

//create email
exports.createEmail = async(req,res)=>{
    const {email} = req.body;
     const userId = req.user.id;
    try{
    const newEmail = await pool.query('INSERT INTO emails (email, user_id) VALUES ($1,$2) RETURNING *',[email, userId]);
    res.json(newEmail.rows[0]);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//READ all emails
exports.getEmails = async(req,res)=>{
     const userId = req.user.id;
try{
    const result = await pool.query('SELECT * FROM emails WHERE user_id = $1 ORDER BY id DESC',[userId]);
    res.json(result.rows);
}
catch(err){
    res.status(500).json({error: err.message});
}
};
//UPDATE email
exports.updateEmail = async(req, res)=>{
    const {id} = req.params;
    const {email} = req.body;
     const userId = req.user.id;
    try{
        await pool.query('UPDATE emails SET email = $1 WHERE id = $2 AND user_id = $3',[email, id, userId]);
        res.json({message: 'Email updated successfully'});
    } catch(err){
        res.status(500).json({error: err.message});
    }
    };
//DELETE email
exports.deleteEmail = async(req, res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    try{
        await pool.query('DELETE FROM emails WHERE id=$1 AND user_id=$2',[id, userId]);
        res.json({message:"Email deleted successfully"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};