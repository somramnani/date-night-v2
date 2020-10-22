module.exports = function(sequelize, DataTypes) {
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
    activities: DataTypes.JSON
  });

  const ActivityEvent = sequelize.define("event", {
    yelpId: STRING,
    thumbnail: STRING.BINARY,
    title: STRING,
    address: STRING,
  });

  const ActivityRestaurant = sequelize.define("restaurant", {
    yelpId: STRING,
    thumbnail: STRING.BINARY,
    title: STRING,
    address: STRING,
    rating: STRING,
    price: STRING,
  });

  Itinerary.hasMany(ActivityEvent, { as: 'events', foreignKey: 'id' });

  ActivityEvent.belongsTo(Itinerary, { as: 'itineraries', foreignKey: 'id'});

  User.hasMany(Itinerary, { as: 'itineraries', foreignKey: 'oauthId', targetKey: 'oauthId'});
  Itinerary.belongsTo(User, { as: 'user', foreignKey: 'oauthId', targetKey: 'oauthId'});

  return User, Itinerary;
};