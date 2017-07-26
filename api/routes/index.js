const projectRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');


module.exports = (app) => {
  projectRoutes(app);
  userRoutes(app);
};