import mongoose from 'mongoose';
let Schema = mongoose.Schema({
        createdAt: {
            type:Date,
            default:Date.now
        },
        name: String,
        management: String,
        city: String,
        state: String,
        zip: Number,
        comment: String
});

export default mongoose.model('Shelter',Schema);
