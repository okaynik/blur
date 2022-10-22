import { IReq, IRes } from '@declarations/types';

var express = require("express");
var router = express.Router();

router.get("/", function(_: IReq, res: IRes) {
    res.send("API is working properly");
});

module.exports = router;