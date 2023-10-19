const ROLES_LIST = {
  admin: parseInt(process.env.ADMIN_ROLE),
  vendor: parseInt(process.env.VENDER_ROLE),
  customer: parseInt(process.env.CUSTOMER_ROLE),
};

export default ROLES_LIST;
