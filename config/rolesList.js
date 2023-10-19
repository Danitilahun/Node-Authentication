const ROLES_LIST = {
  Admin: parseInt(process.env.ADMIN_ROLE),
  Editor: parseInt(process.env.EDITOR_ROLE),
  User: parseInt(process.env.USER_ROLE),
};

module.exports = ROLES_LIST;
