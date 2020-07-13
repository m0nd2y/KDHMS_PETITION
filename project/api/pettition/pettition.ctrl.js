const mongoose = require("mongoose");
const pettitionModel = require("../../models/pettition");

const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

const list = (req, res) => {
  let limit = req.query.limit || 10;
  limit = parseInt(limit, 10);
  if (Number.isNaN(limit)) return res.status(400).end();

  pettitionModel.find((err, result) => {
    if (err) return res.status(500).end();
    res.render("pettition/list", { result });
  })
    .limit(limit)
    .sort({ created: -1 });
};

const detail = (req, res) => {
  const id = req.params.id;

  pettitionModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.render("pettition/detail", { result });
  });
};

const create = (req, res) => {
  const { title, doby, name } = req.body;
  if (!title || !doby || !name)
    return res.status(400).send("필수값이 입력되지 않았습니다.");
  pettitionModel.create({ title, doby, name }, (err, result) => {
    if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");
    res.status(201).json(result);
  });
};

const update = (req, res) => {
  const id = req.params.id;
  pettitionModel.findByIdAndUpdate(id, req.body, { new: true }, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.status(201).json(result);
  });
};

const remove = (req, res) => {
  const id = req.params.id;

  pettitionModel.findByIdAndRemove(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result)
      return res.status(401).send("해당하는 정보가 존재하지 않습니다.");
    res.status(201).json(result);
  });
};

const showCreatePage = (req, res) => {
  res.render("pettition/create");
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;
  pettitionModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.render("pettition/update", { result });
  });
};

module.exports = {
  list,
  detail,
  create,
  update,
  remove,
  showCreatePage,
  showUpdatePage,
  checkId,
};
