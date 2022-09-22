import express from "express";
import UserController from "../src/controllers/UserController.js";
import AuthController from "../src/controllers/AuthController.js";
const router = express.Router();
const userController = new UserController();
const authController = new AuthController();


// Retrieve all users
router.get('/', (req, res) => {
    userController.getAll(req, res);
});
// Connection of a user
router.post('/connection', (req, res) => {
    authController.process(req,res);
})

// Retrieve a user given its ID
router.get('/:id', (req, res) => {
    console.log('yo', req.params);
    userController.getById(req, res);
});


// Create a user
router.post('/', (req, res) => {
    userController.addUser(req, res);
});
// Update a user given its ID
router.put('/:id', (req, res) => {
    userController.updateUser(req, res);
});
// Erase a user given its ID
router.delete('/:id', (req, res) => {
    userController.deleteUser(req, res);
});
 
// Other methods are not allowed, they will give error
router.route('/').all((req,res) => { res.status(405).send(); });
router.route('/:id').all((req,res) => { res.status(405).send(); });
 
export default router;