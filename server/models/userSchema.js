const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');

//Creating the structure/schema of our collection
let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcyrpt.hashSync(this.password, 12);
    }
    next();
})

//Creating the collection/modal

let User = new mongoose.model('User', userSchema);      //Collection name will be User and it will follow the structure defined in userSchema

module.exports = User;