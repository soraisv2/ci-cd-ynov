const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});