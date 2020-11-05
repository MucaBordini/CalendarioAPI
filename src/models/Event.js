import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

export default new model('Event', EventSchema);