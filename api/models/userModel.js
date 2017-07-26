const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
    displayName: {
        type: String,
        required: 'Display name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: 'Email is already exists'
    },
    passwordHash: String,
    salt: String
}, {
    timestamps: true
});

UserSchema.virtual('password')
.set(function(password) {
    this._plainPassword = password;
    if (password) {
        this.salt = crypto.randomBytes(128).toString('base64');
        this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    } else {
        this.salt = undefined;
        this.passwordHash = undefined;
    }
})
.get(function() {
    return this._plainPassword;
});

UserSchema.methods.checkPassword = function (password) {
    if (!password || !this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') === this.passwordHash;
};

module.exports = mongoose.model('Users', UserSchema);