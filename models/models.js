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
    type: STRING,
    name: STRING,
    price: STRING,
    location: STRING,
    yelpId: STRING,
    img: STRING,
    phone: STRING,
    reviews: STRING,
    url: STRING,
  });

  User.hasMany(Itinerary, { 
    as: 'itineraries', 
    // foreignKey: 'oauthId', 
    // targetKey: 'oauthId' 
  });
  
  Itinerary.belongsTo(User, { 
    as: 'user', 
    // foreignKey: 'oauthId', 
    // targetKey: 'oauthId' 
  });

  // return User, Itinerary;
  return User;
};
