module.exports = (sequelize, DataTypes) => {
    const Writing = sequelize.define('Writings', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BookId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Book',
                key: 'id',
            },
            allowNull: false,
        },
    }, {});

    Writing.associate = function (models) {
        Writing.belongsTo(models.Book);
    };

    return Writing;
};
