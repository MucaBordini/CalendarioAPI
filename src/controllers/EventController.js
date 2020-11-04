import Event from '../models/Event';
import jwt from 'jsonwebtoken';

class EventController {
    async store(req, res) {
        
        const authHeader = req.headers.authorization;

        const [, token ] = authHeader.split(' ');

        const payload = jwt.verify(token, process.env.APP_SECRET);

        const userId = payload.userId;

        const { name, date , startTime, endTime, description} = req.body;

        const eventStore = await Event.create({
            name,
            date,
            startTime,
            endTime,
            description,
            userId
        });

        const { _id } = eventStore

        return res.json({ _id });
    }

    async showEvents(req, res){
        //const authHeader = req.headers.authorization;
        var events = [];

        //const [, token ] = authHeader.split(' ');

        //const payload = jwt.verify(token, process.env.APP_SECRET);

        events = await Event.find(req.query).sort({date: 1, startTime: 1}).exec();

        return res.json(events)
        
    }

    async delete(req, res) {
        
        const { event } = req.body;

        Event.deleteOne({ _id: event }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
            return res.status(200).send('Event deleted!');
        });

    }

    async edit(req, res) {

        const { event, name, date, startTime, endTime, description} = req.body;

        Event.findOne({ _id: event } , function(err, foundEvent) {
            if (err) {
                res.status(500).send();
            } else {
                foundEvent.name = name;
                foundEvent.date = date;
                foundEvent.startTime = startTime;
                foundEvent.endTime = endTime;
                foundEvent.description = description;

                foundEvent.save(function(err, updatedEvent) {
                    if (err) {
                        res.status(500).send();
                    } else {
                        res.send(updatedEvent)
                    }
                })
            }
        })
        /*
        Event.findOneAndUpdate({ _id: event }, {
            name: name, 
            date: date, 
            startTime: startTime, 
            endTime: endTime, 
            description: description
        });
        */
    }
}

export default new EventController();
