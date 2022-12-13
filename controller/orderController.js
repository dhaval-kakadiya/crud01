const fs = require("fs");
const path = require("path");

// <<<<<<<<<<<<<<<<<<<<<<< READ ALL DATA FROM ORDER >>>>>>>>>>>>>>>>>

exports.getAllData = async (req, res) => {
  try {
    const order_data = await readFilePromise("orders.json", "utf8");
    const orders = JSON.parse(order_data);
    return res.status(200).json({
      success: true,
      message: "Successfully Data Read From order",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Data Not Read From order",
      error: error.message,
    });
  }
};

// <<<<<<<<<<<<<< FIND order BY STATUS >>>>>>>>>>>>>>>>>>>

exports.getOrderByStatus = async (req, res) => {
  try {
    const statusQuery = req.query.status;

    const filePath = path.join(__dirname, "../orders.json");

    const data = await readFilePromise(filePath, "utf8");
    let orders = JSON.parse(data);

    const order = orders.filter((order) => order.order_status === statusQuery);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Order Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully,Order Data Read By Status",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Order Not Read",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<< UPDATE ORDER TRACKING STATUS BY ID >>>>>>>>>>>>>>>>

exports.updateOrderStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    const newOrder = req.body;

    const filePath = path.join(__dirname, "../orders.json");

    const data = await readFilePromise(filePath, "utf8");
    let orders = JSON.parse(data);

    const order = orders.find((order) => order._id.$oid === _id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Order Not Found",
      });
    }

    order.order_tracking_status = newOrder.order_tracking_status;

    const indexOforder = orders.findIndex((order) => order._id.$oid === _id);
    console.log(indexOforder);

    orders.splice(indexOforder, 1, order);
    updateFile = JSON.stringify(orders);

    await writeFilePromise(filePath, updateFile);

    return res.status(200).json({
      success: true,
      message: "Order Tracking status successfully updated",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Order Tracking status Not Updated",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<< FILTERD ORDER BY SAME VENDOR FOLLOWED BY SAME RESELLERS >>>>>>>>>>>

exports.getOrderByVendorId = async (req, res) => {
  try {
    const ven_id = req.params.id;

    const filePath = path.join(__dirname, "../orders.json");

    const data = await readFilePromise(filePath, "utf8");
    let orders = JSON.parse(data);

    const order = orders.filter((order) => order.vendor_id.$oid === ven_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Order Not Found By Vendor ID ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully,Order Data Readed Have Vendor Id",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Order Not Read",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<< READ ORDERS HAVING RESELLERS ID >>>>>>>>>>>>>>>

exports.getOrderByResellerId = async (req, res) => {
  try {
    const res_id = req.params.id;

    const filePath = path.join(__dirname, "../orders.json");

    const data = await readFilePromise(filePath, "utf8");
    let orders = JSON.parse(data);

    console.log(orders.length)
    const order = orders.filter((order) => order.reseller_by.$oid === res_id);
    console.log(order.length)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Order Not Found By Reseller ID ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully,Order Data Readed Have Reseller Id",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Order Not Read",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<<<<<<<< CONVERTING CALLBACK FUNCTION IN A PROMISE  >>>>>>>>>>>

const readFilePromise = (fileName, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePromise = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
