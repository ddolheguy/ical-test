import ical, { ICalCalendarMethod } from 'ical-generator';
import express from 'express';
import { DateTime } from 'luxon';

const PORT = process.env.PORT || 5001

const app = express();
app.use(express.json());

app.get('/feed.ical', (req, res) => {
    const updated = DateTime.utc().toISO();
    const calendar = ical({name: `my first - ${updated}`});

    calendar.source('https://ical-test-9982b15a03ae.herokuapp.com/feed.ical');
    calendar.url('https://ical-test-9982b15a03ae.herokuapp.com/feed.ical');
    calendar.ttl(30); // 30 seconds

    const startTime = DateTime.utc().plus({ days: 1 });
    const endTime = startTime.plus({ hours: 1 });

    calendar.method(ICalCalendarMethod.PUBLISH);
    calendar.createEvent({
        id: '20030808T12100000Z-12927wd7@example.com',
        // sequence: Math.ceil(DateTime.utc().toSeconds() / 60),
        timezone: 'Europe/London',
        start: startTime,
        end: endTime,
        summary: 'Test Event',
        description: `This is a description - updated: ${updated} `,
        location: 'Some location',
        url: 'https://test.com/'
    });

    return calendar.serve(res);
    // res.json({
    //     message: 'Hello world from Swift Proxy',
    // }).status(200).end();
});

app.listen(PORT, () => {
    console.log(`Started listining on port ${PORT}`);
});
