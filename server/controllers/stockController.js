app.get("/insert", async (req, res) => {
  let store = Stock("18");
  store.then((result) => {
    res.send(result.findAll());
  });
});
