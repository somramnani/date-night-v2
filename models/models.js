module.exports = function (sequelize, DataTypes) {
  const { STRING } = DataTypes;

  const User = sequelize.define("user", {
    oauthId: STRING,
    displayName: STRING,
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    image: STRING,
  });

  const Itinerary = sequelize.define("itinerary", {
    restaurant: DataTypes.JSON,
    event: DataTypes.JSON,
  });

  User.hasMany(Itinerary, { as: 'itinerary' });
  Itinerary.belongsTo(User, { as: 'user' });

  return User, Itinerary;
};
