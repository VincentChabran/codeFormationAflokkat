
const logMiddleware = () => {
  return (req, res, next) => {
    console.log("============")
    console.log(req);
    console.log("============")
    console.log(res);
    console.log("============")
    next();
  }
}

module.exports = logMiddleware;