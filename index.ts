import { Request, Response } from "express";

const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  if (Math.random() > 0.5) {
    res.status(200).send({ ok: true });
  } else {
    res.status(400).send({ ok: false });
  }
});

app.listen(port, () => console.log(`Service listening at http://localhost:${port}`));
