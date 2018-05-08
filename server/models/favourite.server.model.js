import mongoose from 'mongoose';
import Shelter from './shelter.server.model';
let Schema = mongoose.Schema({
        createdAt: {
            type:Date,
            default:Date.now
        },
      book: {
        type:mongoose.Schema.ObjectId,
        ref: 'Shelter'
      }
});

export default mongoose.model('Favourite',Schema);
