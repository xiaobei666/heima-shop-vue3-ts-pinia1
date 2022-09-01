module.exports = {
  auth: require('./auth'),
  uniIdLog: require('./uni-id-log'),
  validate: require('./validate'),
  accessControl: require('./access-control'),
  ...require('./rbac')
}
