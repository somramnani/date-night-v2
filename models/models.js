module.exports = function(sequelize, DataTypes) {
  const { STRING } = DataTypes;
  const User = sequelize.define("user", {
    oauthId: STRING,
    displayName: STRING,
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    image: STRING,
    itinerary: DataTypes.JSON
  });

  const Itinerary = sequelize.define("itinerary", {
    restaurants: STRING,
    events: STRING
  });

  return User, Itinerary;
};