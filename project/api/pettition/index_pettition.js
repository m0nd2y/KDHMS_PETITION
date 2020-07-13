const express = require("express");
const router = express.Router();
const ctrl = require("./pettition.ctrl");

router.get("/", ctrl.list);

router.get("/new", ctrl.showCreatePage);

router.get("/:id", ctrl.checkId, ctrl.detail);

router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage);

router.post("/", ctrl.create);

router.put("/:id", ctrl.checkId, ctrl.update);

router.delete("/:id", ctrl.checkId, ctrl.remove);

module.exports = router;
