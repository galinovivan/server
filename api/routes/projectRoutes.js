/**
 * Created by 91178 on 25.07.2017.
 */
module.exports = function(app) {
  const projectsController = require('../controllers/projectsController');


  app.route('/projects')
      .get(projectsController.getAll)
      .post(projectsController.create);

  app.route('/projects/:id')
      .get(projectsController.getById)
      .put(projectsController.update)
      .delete(projectsController.delete);
};