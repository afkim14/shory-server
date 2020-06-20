module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profile_image: {
            type: DataTypes.STRING,
        },
    }, {});

    User.associate = function (models) {
        User.hasMany(models.BookFeedback, { onDelete: 'cascade', as: 'bookFeedbacks' });
        User.hasMany(models.WritingFeedback, { onDelete: 'cascade', as: 'writingFeedbacks' });
    };

    return User;
};
