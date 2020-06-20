module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Books', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AuthorId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Author',
                key: 'id',
            },
            allowNull: false,
        },
    }, {});

    Book.associate = function (models) {
        Book.hasMany(models.Writing, { onDelete: 'cascade', as: 'writings' });
    };

    return Book;
};
