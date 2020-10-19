module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    oauthId: DataTypes.STRING,
    displayName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    itinerary: DataTypes.JSON //removed itinerary model and just placed it on the user.
  });
  return User;
};