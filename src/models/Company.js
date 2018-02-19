import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    name: String,
    description: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const Company = mongoose.model('Company', companySchema);

export default Company;
