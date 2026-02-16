const db = require('../database/conexion');

class StudentsController {
    constructor() {}

    get(req, res){

        try { 
            db.query('SELECT * FROM students',
                
                (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(200).json(rows);
                });

        } catch(err) {
            res.status(500).json({ msg: "Error retrieving students" });
        }
    };

    getDetails(req, res){
        const {id } = req.params

          try { 
            db.query('SELECT * FROM students WHERE id = ?', [id],
                
                (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(200).json(rows);
                });

        } catch(err) {
            res.status(500).json({ msg: "Error retrieving students" });
        }
    };
        

    create(req,res){ 
        try {
            const { dni, name, last_name, email } = req.body;
            db.query('INSERT INTO students (id, dni, name, last_name, email) VALUES (NULL, ?, ?, ?, ?)',
                [dni, name, last_name, email], (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(201).json({ id: rows.insertId });

                });
                
                


        } catch(err) {
            res.status(500).json({ msg: "Error creating student" });
        }
    };
    update(req, res){
        const {id } = req.params 

        try {
            const { dni, name, last_name, email } = req.body;
            db.query('UPDATE students SET dni = ?, name = ?, last_name = ?, email = ? WHERE id = ?',
                [dni, name, last_name, email, id], (err, result) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }
                    
                
                
                if (result.affectedRows === 1) {
                    res.status(200).json({ msg: "Student updated successfully" });
                } else {
                    res.status(404).json({ msg: "Student not found or not updated" });
                }
        });

        } catch(err) {
            res.status(500).json({ msg: "Error updating student" });
        }
    };
    delete(req, res){
        
        const {id } = req.params 
        db.query('DELETE FROM students WHERE id = ?',
                [id], (err, rows) => {
                if(err) {
                    res.status(400).send(err);
                    
                }  
            if (rows.affectedRows === 1) {
                res.status(200).json({ msg: "Student deleted successfully" });
            } else {
                res.status(404).json({ msg: "Student not found or not deleted" });
            }
    });
}

}

module.exports = new StudentsController;