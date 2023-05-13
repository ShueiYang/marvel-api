// Using ES2022 module to use top level await 
import "dotenv/config";
import app from "./app.js";

import { createServer } from "http";
import { startServer } from "./services/mongo.connect.js";

const httpServer = createServer(app);
const PORT = process.env.PORT || 8000;

await startServer();


httpServer.listen(PORT, () => {
    console.log(`app is running on port ${PORT} 🚀`)
});