/**
 * Created by 91178 on 25.07.2017.
 */
const mongoose = require('mongoose');
const projectModel = mongoose.model('Projects');

exports.getAll = (req, res) => {
    projectModel.find({}, (err, project) => {
        if (err) res.send(err);
        res.json(project);
    })
};

exports.create = (req, res) => {
  let newProject = new projectModel(req.body);
  newProject.save((err, project) => {
      if (err) res.send(err);
      res.json(project);
  })
};

exports.getById = (req, res) => {
  projectModel.findById(req.params.id, (err, project) => {
      if (err) res.send(err);
      res.json(project);
  })
};

exports.update = (req, res) => {
  projectModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, project) => {
      if (err) res.send(err);
      res.json(project);
  })
};

exports.delete = (req, res) => {
  projectModel.remove({
      _id: req.params.id
  }, (err, project) => {
      if (err) res.send(err);
      res.json({ message: 'Post is deleted' })
      }
  )
};