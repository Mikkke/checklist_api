const app = require("./server");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listenning on port ${PORT}`);
});
