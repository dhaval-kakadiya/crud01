const fs = require("fs");
const path = require("path");

// <<<<<<<<<<<<<<<<<<<<<<< READ ALL DATA FROM RESELLER >>>>>>>>>>>>>>>>>

exports.getAllReseller = async (req, res) => {
  try {
    const reseller_data = await readFilePromise("resellers.json", "utf8");
    const resellers = JSON.parse(reseller_data);
    return res.status(200).json({
      success: true,
      message: "Successfully ata Read From reseller",
      data: resellers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Data Not Read From reseller",
      error: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<<<<<<<<< UPDATE DATA BY ID >>>>>>>>>>>>>>>>>

exports.updateReseller = async (req, res) => {
  try {
    const _id = req.params.id;
    const newReseller = req.body;

    const filePath = path.join(__dirname, "../resellers.json");

    const data = await readFilePromise(filePath, "utf8");
    let resellers = JSON.parse(data);

    const reseller = resellers.find((reseller) => reseller._id.$oid === _id);

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Reseller Not Found",
      });
    }

    reseller.first_name = newReseller.first_name;

    const indexOfreseller = resellers.findIndex(
      (reseller) => reseller._id.$oid === _id
    );
    console.log(indexOfreseller);

    resellers.splice(indexOfreseller, 1, reseller);
    updateFile = JSON.stringify(resellers);

    await writeFilePromise(filePath, updateFile);

    return res.status(200).json({
      success: true,
      message: "reseller successfully updated",
      data: reseller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Reseller Not Updated",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<<<<<<<<< DELETE DATA BY ID >>>>>>>>>>>>>>>>>

exports.deleteReseller = async (req, res) => {
  try {
    const _id = req.params.id;

    const filePath = path.join(__dirname, "../resellers.json");

    const data = await readFilePromise(filePath, "utf8");
    let resellers = JSON.parse(data);

    const reseller = resellers.find((reseller) => reseller._id.$oid === _id);
    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Reseller Not Found",
      });
    }

    const indexOfreseller = resellers.findIndex(
      (reseller) => reseller._id.$oid === _id
    );

    resellers.splice(indexOfreseller, 1);

    updateFile = JSON.stringify(resellers);

    const writeFile = await writeFilePromise(filePath, updateFile);

    if (writeFile === true) {
      return res.status(200).json({
        success: true,
        message: "reseller Data successfully deleted",
        data: resellers,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Reseller Data Not Delete",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<< ADD FOLLOW REQUEST FROM VENDOR TO RESELLER >>>>>>>>>>>>>>>

exports.addfollowReq = async (req, res) => {
  try {
    const _id = req.params.id;
    const vendor_id = req.body;

    const filePath = path.join(__dirname, "../resellers.json");

    const data = await readFilePromise(filePath, "utf8");
    let resellers = JSON.parse(data);

    const reseller = resellers.find((reseller) => reseller._id.$oid === _id);

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Reseller Not Found",
      });
    }

    reseller.following_vendor.push(vendor_id);

    const indexOfreseller = resellers.findIndex(
      (reseller) => reseller._id.$oid === _id
    );

    resellers.splice(indexOfreseller, 1, reseller);

    updateFile = JSON.stringify(resellers);

    await writeFilePromise(filePath, updateFile);

    return res.status(200).json({
      success: true,
      message: "Vendor Id successfull Add At Following Vendor",
      data: reseller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Following Vendor Not Updated",
      data: error.message,
    });
  }
};

// <<<<<<<<<<<<<< REMOVE FOLLOW REQUEST FROM VENDOR TO RESELLER >>>>>>>>>>>>>>>

exports.removefollowReq = async (req, res) => {
  try {
    const _id = req.params.id;
    const vendorQuery = req.query.remove;

    const filePath = path.join(__dirname, "../resellers.json");

    const data = await readFilePromise(filePath, "utf8");
    let resellers = JSON.parse(data);

    const reseller = resellers.find((reseller) => reseller._id.$oid === _id);

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Reseller Not Found",
      });
    }

    const flwArray = reseller.following_vendor;

    const vendor_id = flwArray.find((x) => x.$oid === vendorQuery);
    const final_vendor = flwArray.includes(vendor_id);

    if (final_vendor) {
      const indexOfreseller = flwArray.findIndex(
        (vendor_id) => vendor_id === vendor_id
      );

      console.log(indexOfreseller);
      flwArray.splice(indexOfreseller, 1);

      updateFile = JSON.stringify(resellers);

      await writeFilePromise(filePath, updateFile);

      return res.status(200).json({
        success: true,
        message: "Vendor Id successfull Remove At Following Vendor",
        data: reseller,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed !! Following Vendor ID Not Remove",
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
