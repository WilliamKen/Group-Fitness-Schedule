const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Airtable = require('airtable');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure Airtable with environment variables
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

app.use(cors());
app.use(bodyParser.json());

app.get('/api/classes', (req, res) => {
  base('Classes').select({ view: 'Classes' }).eachPage((records, fetchNextPage) => {
    const classes = records.map(record => ({
      id: record.id,
      day: record.get('Day'),
      time: record.get('Time'),
      name: record.get('Class Name'),
      instructor: record.get('Instructor'),
      description: record.get('Description'),
      location: record.get('Location'),
    }));
    res.json(classes);
    fetchNextPage();
  }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch classes from Airtable' });
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
