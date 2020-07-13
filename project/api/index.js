const { Router } = require("express");
const router = Router();

router.use("/pettition", require("./pettition/index_pettition"));

module.exports = router;
