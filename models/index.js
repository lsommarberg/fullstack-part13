const User = require('./user');
const Blog = require('./blog');
const ReadingList = require('./reading_list');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, foreignKey: 'userId' });
Blog.belongsToMany(User, { through: ReadingList, foreignKey: 'blogId' });

User.hasMany(ReadingList, { foreignKey: 'userId' });
ReadingList.belongsTo(User, { foreignKey: 'userId' });

ReadingList.belongsTo(Blog, { foreignKey: 'blogId' });

User.hasMany(Session, { foreignKey: 'userId' });
Session.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
