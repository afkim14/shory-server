module.exports = (sequelize, DataTypes) => {
    const WritingFeedback = sequelize.define('WritingFeedbacks', {
        liked: {
            type: DataTypes.BOOLEAN,
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

    WritingFeedback.associate = function (models) {
        WritingFeedback.belongsTo(models.User);
    };

    return WritingFeedback;
};
