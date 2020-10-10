module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    oauthId: DataTypes.STRING,
    displayName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING
  });
  return User;
};
