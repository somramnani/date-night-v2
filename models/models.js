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
    oauthId: STRING,
    activities: DataTypes.JSON,
  });

  User.hasMany(Itinerary, {
    as: "itineraries",
    foreignKey: "oauthId",
    // targetKey: "oauthId",
  });
  Itinerary.belongsTo(User, {
    as: "user",
    foreignKey: "oauthId",
    // targetKey: "oauthId",
  });

  return User, Itinerary;
};
