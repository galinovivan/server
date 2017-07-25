/**
 * Created by 91178 on 25.07.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectsSchema = new Schema({
    name: {
        type: String,
        required: 'field is required'
    },
    source: {
        type: String,
        required: 'field is required'
    },
    imageSrc: {
        type: String,
        required: 'field is required'
    },
    description: {
        type: String,
        required: 'field is required'
    },
    category: {
        type: String,
        required: 'field is required'
    }

});

module.exports = mongoose.model('Projects', projectsSchema);