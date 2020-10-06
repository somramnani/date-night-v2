module.exports = function(sequelize, DataTypes) {
  const Itinerary = sequelize.define("itinerary", {
    restaurant: DataTypes.STRING,
    event: DataTypes.STRING
  });
  return Itinerary;
};
