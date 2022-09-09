const db = require('../config/config');

const Donations = {};

Donations.findByCategory = (id_category) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        donations AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1
    `;

    return db.manyOrNone(sql, id_category);
}

Donations.findByCategoryAndProductName = (id_category, product_name) => {
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
        donations AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1 AND p.name ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
}


Donations.create = (donations) => {
    const sql = `
    INSERT INTO
        donations(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `;
    return db.oneOrNone(sql, [
        donations.name,
        donations.description,
        donations.price,
        donations.image1,
        donations.image2,
        donations.image3,
        donations.id_category,
        new Date(),
        new Date()
    ]);
}

Donations.update = (donations) => {
    const sql = `
    UPDATE
        donations
    SET
        name = $2,
        description = $3, 
        price = $4,
        image1 = $5,
        image2 = $6,
        image3 = $7,
        id_category = $8,
        updated_at = $9
    WHERE
        id = $1
    `;
    return db.none(sql, [
        donations.id,
        donations.name,
        donations.description,
        donations.price,
        donations.image1,
        donations.image2,
        donations.image3,
        donations.id_category,
        new Date()
    ]);
}


module.exports = Donations;