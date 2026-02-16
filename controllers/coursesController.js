const db = require('../database/conexion');

class CoursesController {
    constructor() {}

    get(req, res){
      
        try { 
            db.query('SELECT * FROM courses',
                
                (err, rows) => {
                    if(err) {

                        res.status(400).send(err);
                        
                    }

                    res.status(200).json(rows);
                });

        } catch(err) {
            res.status(500).json({ msg: "Error retrieving courses" });
        }
    };

    getDetails(req, res){
        const {id } = req.params
     

          try { 
            db.query('SELECT * FROM courses WHERE id = ?', [id],
                
                (err, rows) => {
                    if(err) {
                        res.status(400).send(err);
                        
                    }

                    res.status(200).json(rows);
                });

        } catch(err) {
            res.status(500).json({ msg: "Error retrieving courses" });
        }
    };

    create(req, res){ 
    try {

        const { name, description, profesor_id } = req.body;

        db.query(
            'INSERT INTO courses (id, name, description, profesor_id) VALUES (NULL, ?, ?, ?)',
            [name, description, profesor_id],
            (err, rows) => {

                if (err) {

                    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                        return res.status(400).json({
                            msg: "Invalid professor ID"
                        });
                    }

                    return res.status(500).json({
                        msg: "Database error",
                        error: err.message
                    });
                }

                return res.status(201).json({
                    id: rows.insertId
                });

            }
        );

    } catch(err) {
        res.status(500).json({ msg: "Error creating course" });
    }
};
    update(req, res){ 
    const { id } = req.params;

    try {

        const { name, description, profesor_id } = req.body;

        db.query(
            'UPDATE courses SET name = ?, description = ?, profesor_id = ? WHERE id = ?',
            [name, description, profesor_id, id],
            (err, result) => {

                if (err) {

                    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                        return res.status(400).json({
                            msg: "Invalid professor ID"
                        });
                    }

                    return res.status(500).json({
                        msg: "Database error",
                        error: err.message
                    });
                }

                if (result.affectedRows === 1) {
                    return res.status(200).json({
                        msg: "Course updated successfully"
                    });
                } else {
                    return res.status(404).json({
                        msg: "Course not found"
                    });
                }

            }
        );

    } catch(err) {
        res.status(500).json({ msg: "Error updating course" });
    }
};

    delete(req, res){
         const {id } = req.params 
        db.query('DELETE FROM courses WHERE id = ?',
                [id], (err, rows) => {
                if(err) {
                    res.status(400).send(err);
                    
                }  
            if (rows.affectedRows === 1) {
                res.status(200).json({ msg: "Course deleted successfully" });
            } else {
                res.status(404).json({ msg: "Course not found or not deleted" });
            }
    });


    }

assignStudent(req, res){ 
    try {

        const { course_id, student_id } = req.body;

        db.query(
            'INSERT INTO students_courses (course_id, student_id) VALUES (?, ?)',
            [course_id, student_id],
            (err, rows) => {

                if (err) {

                    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                        return res.status(400).json({
                            msg: "Invalid student ID"
                        });
                    }

                    return res.status(500).json({
                        msg: "Database error",
                        error: err.message
                    });
                }

                return res.status(201).json({
                    msg: "Student enrolled in course successfully"
                });

            }
        );

    } catch(err) {
        res.status(500).json({ msg: "Error creating student-course assignment" });
    }
};
}



module.exports = new CoursesController;