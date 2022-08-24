const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');
const categoriesController = require('../controllers/categoriesController');


module.exports = (app, upload) => {

    /*
    * GET ROUTES
    */
   app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);

    /*
    * POST ROUTES
    */
   app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);

//    app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), CategoriesController.create);
}