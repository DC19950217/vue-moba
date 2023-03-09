const { async } = require("_rxjs@6.5.2@rxjs/internal/scheduler/async");

module.exports = (app) => {
  const express = require("express");
  // 处理token
  const jwt = require("jsonwebtoken");
  // 处理报错
  const assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser");
  const router = express.Router({
    mergeParams: true,
  });
  /**
   * 测试接口
   * /admin/api/rest/:resource(动态传递)
   */
  router.get("/Test", async (req, res) => {
    res.send("test code success");
  });
  /**
   * 添加数据接口
   * /admin/api/rest/:resource(动态传递)
   */
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  /**
   * 根据id修改数据内容接口
   * /admin/api/rest/:resource(动态传递)
   */
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  /**
   * 根据id删除数据接口
   * /admin/api/rest/:resource(动态传递)
   */
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  /**
   * 获取所有数据接口
   * /admin/api/rest/:resource(动态传递)
   */
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100);
    res.send(items);
  });
  /**
   * 获取某详情页数据接口
   * /admin/api/rest/:resource(动态传递)/:id
   */
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 登录校验中间件
  //, authMiddleware(),resourceMiddleware()
  const authMiddleware = require("../../middleware/auth");
  const resourceMiddleware = require("../../middleware/resource");
  app.use("/admin/api/rest/:resource", router);

  // 处理二进制图片上传
  const multer = require("multer");
  const upload = multer({
    dest: __dirname + "/../../uploads",
  });
  /**
   * 图片上传接口
   * /admin/api/upload
   */
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );
  app.get("/admin/api/test1", async (req, res) => {
    res.send("hello world");
  });
  // 登录
  app.post("/admin/api/login", async (req, res) => {
    const { username, password, loginDate } = req.body;
    // 根据用户名找用户
    const user = await AdminUser.findOne({
      username,
    }).select("+password");
    assert(user, 422, "用户不存在！");
    user.loginDate = loginDate;
    user.save();
    // 校验密码
    // const isvalue = require("bcrypt").compareSync(password, user.password);
    const isvalue = true;
    assert(isvalue, 422, "用户名或者密码错误！");
    // 返回token
    const token = jwt.sign({ id: user._id }, app.get("secret"), {
      expiresIn: 3600,
    });
    res.send({ token });
  });
  //注册
  app.post("/admin/api/register", async (req, res) => {
    const model = await AdminUser.create(req.body);
    const test = await AdminUser.find({});
    res.send(model);
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
