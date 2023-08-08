import ical from 'ical-generator';
import express from 'express';

const PORT = process.env.PORT || 5001

const app = express();
app.use(express.json());

app.get('/feed.ical', (req, res) => {
    const calendar = ical({name: 'my first iCal'});

    calendar.url('https://ical-test-9982b15a03ae.herokuapp.com/feed.ical');
    calendar.ttl(60); // 10 seconds

    const startTime = new Date();
    const endTime = new Date();

    endTime.setHours(startTime.getHours()+1);

    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: 'Test Event',
        description: 'This is a description',
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
