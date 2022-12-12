const fs = require("fs");
const path = require("path");

// <<<<<<<<<<<<<<<<<<<<<<< READ ALL DATA FROM VENDOR >>>>>>>>>>>>>>>>>

exports.getAllVandor = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../vendors.json");
    const vendor_data = await readFilePromise(filePath, "utf8");
    const vendors = JSON.parse(vendor_data);
    return res.status(200).json({
      success: true,
      message: "Successfully Data Read From vendor",
      data: vendors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Data Not Read From vendor",
      error: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<<<<<< READ VENDOR DATA BY ID >>>>>>>>>>>>>>>>>>>>>>

exports.getVendorById = async (req, res) => {
  try {
    const id = req.params.id;

    const filePath = path.join(__dirname, "../vendors.json");

    const data = await readFilePromise(filePath, "utf8");
    let vendors = JSON.parse(data);

    const vendor = vendors.find((vendor) => vendor._id.$oid === id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Failed !! vendor Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully,Vendor Data Read By ID",
      data: vendor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! vendor Not Read",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<< FIND VENDOR BY STATUS >>>>>>>>>>>>>>>>>>>

exports.getVendorByStatus = async (req, res) => {
  try {
    const statusQuery = req.query;

    const filePath = path.join(__dirname, "../vendors.json");

    const data = await readFilePromise(filePath, "utf8");
    let vendors = JSON.parse(data);

    const vendor = vendors.filter((vendor) => vendor.status === statusQuery);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Failed !! vendor Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully,Vendor Data Read By Status",
      data: vendor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! vendor Not Read",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<<< UPDATE DATA BY ID >>>>>>>>>>>>>>>>>>>>>>>

exports.updateVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const newVendor = req.body;

    const filePath = path.join(__dirname, "../vendors.json");

    const data = await readFilePromise(filePath, "utf8");
    let vendors = JSON.parse(data);

    const vendor = vendors.find((vendor) => vendor._id.$oid === id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Failed !! vendor Not Found",
      });
    }

    vendor.vendor_name = newVendor.vendor_name;

    const indexOfvendor = vendors.findIndex((vendor) => vendor._id.$oid === id);
    console.log(indexOfvendor);

    vendors.splice(indexOfvendor, 1, vendor);
    updateFile = JSON.stringify(vendors);

    await writeFilePromise(filePath, updateFile);

    return res.status(200).json({
      success: true,
      message: "vendor successfully updated",
      data: vendor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! vendor Not Updated",
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
