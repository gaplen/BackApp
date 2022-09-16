const db = require('../config/config');

const Category = {};

Category.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            image,
            description
        FROM
            categories
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}


Category.create = (category) => {
    const sql = `
    INSERT INTO
        categories(
            name,
            image,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.image,
        category.description,
        new Date(),
        new Date()
    ]);
}


Category.update = (category) => {
    const sql = `
    UPDATE
        category
    SET
        name = $2,
        image = $3,
        description = $5, 
        id_category = $6,
        updated_at = $7
    WHERE
        id = $1
    `;
    return db.none(sql, [
        category.id,
        category.name,
        category.image,
        category.description,
        category.id_category,
        new Date()
    ]);
}

module.exports = Category;