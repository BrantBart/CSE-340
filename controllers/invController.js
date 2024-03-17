const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

invCont.buildById = async function (req, res, next) {
  const invId = req.params.invId;
  try {
    const data = await invModel.getById(invId);
    if (!data) {
      return res.status(404).send("Inventory not found");
    }
    const grid = await utilities.buildGrid(data);
    const nav = await utilities.getNav();
    res.render("./inventory/inventoryDetail", {
      title: data.name,
      inventory: data,
      nav,
      grid,
    });
  } catch (error) {
    console.error("buildById error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = invCont;
