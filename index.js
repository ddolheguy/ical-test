import ical from 'ical-generator';
import http from 'node:http';

const calendar = ical({name: 'my first iCal'});

calendar.url('http://127.0.0.1:3000');
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

const PORT = process.env.PORT || 5001
http.createServer((req, res) => {
    console.log('CALLED');
    return calendar.serve(res);
})
    .listen(PORT, '127.0.0.1', () => {
        console.log(`Server running at http://127.0.0.1:${PORT}/`);
    });
