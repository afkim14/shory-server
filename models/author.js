module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Authors', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {});

    Author.associate = function (models) {
        Author.hasMany(models.Book, { onDelete: 'cascade', as: 'books' });
    };

    return Author;
};
