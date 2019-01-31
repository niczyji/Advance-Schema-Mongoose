const express = require('express');
const router = express.Router();
// include employee model
const Employee = require('../models/employee');
const Department = require('../models/department');

router.get('/', (req, res) => {
   res.render('index')
});

router.post('/add/employee', (req, res) => {
   console.log(req.body);
   let newEmployee = new Employee({
      name: {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         middleName: req.body.lastName
      },
      email: req.body.email,
      country: req.body.country,
      country_code: req.body.country_code,
      age: req.body.age,
      // joining date: job starts in a nice date format
      joining_date: req.body.joining_date,
      // employee register at
      created_at: Date.now(),
      spouse: req.body.spouse,
      department: '5c4622ef1c68c136b17f118b'
   });
   newEmployee.movie = ['Terminator', 'White Rabbit'];
   newEmployee.movie.push(req.body.movie);
   newEmployee.save();
   res.json(newEmployee);
});

router.get('/department', (req, res) => {
   res.render('department');
});

router.post('/add/department', (req, res) => {
   const newDept = new Department({
      name: req.body.name,
      address: {
         street: req.body.street,
         zip: req.body.zip,
         city: req.body.city
      }
   });
   newDept.save(err => {
      if (err) throw err;
      res.send('dept added')
   })
});

// find employee by id and show populate for department
router.get('/employee', (req, res) => {
   let id = '5c462528cd5c0d3766acd451';
   const query = Employee.findById(id);
   query.populate('department', '-_id');
   query.exec((err, result) => {
      res.json(result);
   });
});


// add model school
const School = require('../models/school');

// new school
router.route('/school')
   .get((req, res) => {
      res.render('school');
   })
   .post((req, res) => {
      console.log(req.body);
      const newSchool = new School({
         name: req.body.name,
         address: {
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city
         }
      });
      newSchool.save(err => {
         if (err) {
            res.json(err);
         } else {
            res.json('School is added...');
            }
         
      })
   });

// add model school
const Student = require('../models/student');
// new school
router.route('/student')
   .get((req, res) => {
      res.render('student');
   })
   .post((req, res) => {
      console.log(req.body);
      const newStudent = new Student({
         name: req.body.name,
         age: req.body.age,
         course: req.body.course,
         school: {
            type: Schema.Types.ObjectId,
            ref: "School"
         }
      });
      newStudent.save(err,data => {
         if (err) {
            res.render(err)
         }
         res.json(data);
      })
   });


module.exports = router;