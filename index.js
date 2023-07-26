import 'dotenv/config';
import { PORT_SERVER } from './config.js';
import app from './src/app.js';

const port = PORT_SERVER || 300;

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`)
});