const allowedHosts = [
  'localhost'
];

const preventUnknownHosts = (req, res, next) => {
  console.log(req);
}

module.exports = preventUnknownHosts;