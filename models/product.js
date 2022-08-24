const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        p.age,
        p.sex,
        p.weight,
        p.breed,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1
    `;

    return db.manyOrNone(sql, id_category);
}

Product.findByCategoryAndProductName = (id_category, product_name) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        p.age,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1 AND p.name ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
}


Product.create = (product) => {
    const sql = `
    INSERT INTO
        products(
            name,
            age,
            sex,
            weight,
            breed,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id
    `;
    return db.oneOrNone(sql, [
        product.name,
        product.age,
        product.sex,
        product.weight,
        product.breed,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date(),
        new Date()
    ]);
}

Product.update = (product) => {
    const sql = `
    UPDATE
        products
    SET
        name = $2,
        age = $3,
        sex = $4,
        weight = $5,
        breed = $6,
        description = $7, 
        price = $8,
        image1 = $9,
        image2 = $10,
        image3 = $11,
        id_category = $12,
        updated_at = $13
    WHERE
        id = $1
    `;
    return db.none(sql, [
        product.id,
        product.name,
        product.age,
        product.sex,
        product.weight,
        product.breed,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date()
    ]);
}


module.exports = Product;