module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {  
      type: DataTypes.STRING,
      allowNull: true,  
    }
  }, {
    tableName: 'Posts',
    timestamps: true,
  });

  return Post;
};
