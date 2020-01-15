const requireAll = (requireContext: any): any =>
  requireContext.keys().map(requireContext);
const req = require.context("./modules/", false, /\.ts$/);
let apis: any = {};
requireAll(req).forEach((item: any) => {
  // console.log("item1", item);
  apis = {
    ...apis,
    ...item
  };
});

export default apis;
