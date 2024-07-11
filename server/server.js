const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

app.listen(8000, () => {
  console.log(`server running on port ${8000}`);
});