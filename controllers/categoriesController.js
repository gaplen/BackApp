const Category = require('../models/category');

const storage = require('../utils/cloud_storage');

const asyncForEach = require('../utils/async_foreach');



module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await Category.getAll();
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las categorias',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {


        try {
            
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.create(category);

            return res.status(201).json({
                message: 'La categoria se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }
        
    },

    async createWithImage(req, res, next) {
        try {
            
            const category = JSON.parse(req.body.category);
            console.log(`Datos enviados del usuario: ${category}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    category.image = url;
                }
            }

            const data = await Category.create(category);
            

            // await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicia sesion',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },
   


}

