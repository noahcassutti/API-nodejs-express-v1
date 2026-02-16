const db = require('../database/conexion');

class ProfesorsController {
    constructor() {}

    get(req, res){
         try { 
            db.query('SELECT * FROM profesors',
                
                (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(200).json(rows);
                });

        } catch(err) {
            res.status(500).json({ msg: "Error retrieving profesors" });
        }
    
    };

    getDetails(req, res){
       const {id } = req.params

          try { 
            db.query('SELECT * FROM profesors WHERE id = ?', [id],
                
                (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(200).json(rows);
                });

        } catch(err) {
            res.status(500).json({ msg: "Error retrieving profesors" });
        }
        
    };

    create(req,res){ 
        try {
            const { dni, name, last_name, email, id, profession, cell_phone } = req.body;
            db.query('INSERT INTO profesors (id, dni, name, last_name, email, profession, cell_phone) VALUES (NULL, ?, ?, ?, ?, ?, ?)',
                [dni, name, last_name, email, id, profession, cell_phone], (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(201).json({ id: rows.insertId });

                });
        } catch(err) {
            res.status(500).json({ msg: "Error creating profesor" });
        }
    };
    update(req, res){ 
        const {id } = req.params 

        try {
            const { dni, name, last_name, email, profession, cell_phone } = req.body;
            db.query('UPDATE profesors SET dni = ?, name = ?, last_name = ?, email = ?, profession = ?, cell_phone = ? WHERE id = ?',
                [dni, name, last_name, email, profession, cell_phone, id], (err, result) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }
                
                if (result.affectedRows === 1) {
                    res.status(200).json({ msg: "Profesor updated successfully" });
                } else {
                    res.status(404).json({ msg: "Profesornot found or not updated" });
                }
        });

        } catch(err) {
            res.status(500).json({ msg: "Error updating student" });
        }
    
    }
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

module.exports = new ProfesorsController();