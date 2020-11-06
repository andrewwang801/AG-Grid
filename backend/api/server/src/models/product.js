'use strict';
const {
  Model
} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Product.init({
//     remaining_quantity: DataTypes.STRING,
//     title: DataTypes.STRING,
//     mrp: DataTypes.STRING,
//     selling_price: DataTypes.STRING,
//     delivery_fee: DataTypes.STRING,
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     }
//   }, {
//     timestamps: false,
//     sequelize,
//     modelName: 'Product',
//   });
//   return Product;
// };

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    remaining_quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mrp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selling_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_fee: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, 
  { timestamps: false }
  );
  return Product;
};
