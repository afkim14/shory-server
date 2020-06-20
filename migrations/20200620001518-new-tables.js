'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Authors', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            profile_image: {
                type: Sequelize.DataTypes.STRING,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable('WritingFeedbacks', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            liked: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
            },
            UserId: {
                type: Sequelize.DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                },
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable('BookFeedbacks', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            rating: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            UserId: {
                type: Sequelize.DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                },
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable('Books', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            AuthorId: {
                type: Sequelize.DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Authors',
                    key: 'id',
                },
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable('Writings', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            text: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            BookId: {
                type: Sequelize.DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Books',
                    key: 'id',
                },
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Authors');
        await queryInterface.dropTable('Books');
        await queryInterface.dropTable('BookFeedbacks');
        await queryInterface.dropTable('Users');
        await queryInterface.dropTable('Writings');
        await queryInterface.dropTable('WritingFeedbacks');
    },
};
