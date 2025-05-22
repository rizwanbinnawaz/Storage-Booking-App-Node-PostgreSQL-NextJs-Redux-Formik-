import { sequelize } from '../sequelize.js';
import StorageUnitModel from './StorageUnit.js';
import BookModel from './Book.js';

const StorageUnit = StorageUnitModel(sequelize);
const Book = BookModel(sequelize);

export { sequelize, StorageUnit, Book };