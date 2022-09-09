const DonationsController = require('../controllers/donationsController');
const passport = require('passport');
const categoriesController = require('../controllers/categoriesController');

module.exports = (app, upload) => {

    app.get('/api/donations/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), DonationsController.findByCategory);
    app.get('/api/donations/findByCategoryAndProductName/:id_category/:product_name', passport.authenticate('jwt', {session: false}), DonationsController.findByCategoryAndProductName);

    app.post('/api/donations/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), DonationsController.create);


    
}