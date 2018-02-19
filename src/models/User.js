import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

const User = mongoose.model('User', userSchema);

export default User;
