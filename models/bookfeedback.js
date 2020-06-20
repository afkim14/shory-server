module.exports = (sequelize, DataTypes) => {
    const BookFeedback = sequelize.define('BookFeedbacks', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'User',
                key: 'id',
            },
            allowNull: false,
        },
    }, {});

    BookFeedback.associate = function (models) {
        BookFeedback.belongsTo(models.User);
    };

    return BookFeedback;
};
