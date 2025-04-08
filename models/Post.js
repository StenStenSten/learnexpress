// models/Post.js
export default (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        tableName: 'Posts',  // Ensure it's the right table name
        timestamps: true     // This will automatically add createdAt and updatedAt columns
    });

    return Post;
};
