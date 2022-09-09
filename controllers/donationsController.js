const Donations = require('../models/donations');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async findByCategory(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const data = await Donations.findByCategory(id_category);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },
    
    async findByCategoryAndProductName(req, res, next) {
        try {
            const id_user = req.params.id_category; // CLIENTE
            const product_name = req.params.product_name; // CLIENTE
            const data = await Donations.findByCategoryAndProductName(id_user, product_name);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByProductName(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const product_name = req.params.product_name; // CLIENTE
            const data = await Donations.findByProductName(id_category, product_name);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {

        let donations = JSON.parse(req.body.donations);
        console.log(`Donations ${JSON.stringify(donations)}`);

        const files = req.files; 

        let inserts = 0;
        
        if (files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto no tiene imagen',
                success: false
            });
        }
        else {
            try {
                 
                const data = await Donations.create(donations); // ALMACENANDO LA INFORMACION
                donations.id = data.id;

                const start = async () => {
                     await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage(file, pathImage);

                        if (url !== undefined && url !== null) {
                            if (inserts == 0) { // IMAGEN 1
                                donations.image1 = url;
                            }
                            else if(inserts == 1) { // IMAGEN 2
                                donations.image2 = url;
                            }
                            else if(inserts == 2) { // IMAGEN 3
                                donations.image3 = url;
                            }
                        }

                        await Donations.update(donations);
                        inserts = inserts + 1;

                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'El producto se ha registrado correctamente'
                            });
                        }

                     }); 

                }

                start();

            } 
            catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message: `Error al registrar el producto ${error}`,
                    success: false,
                    error: error
                });
            }
        }

    }

}