import mongoose from 'mongoose';
let Schema = mongoose.Schema({
        createdAt: {
            type:Date,
            default:Date.now
        },
        title: String,
        author: String,
        price: Number,
        year: Number
});

export default mongoose.model('Shelter',Schema);
