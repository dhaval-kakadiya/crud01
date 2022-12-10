const fs = require("fs");

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

exports.updateReseller = async (req, res) => {
  try {
    const _id = req.params.id;
    const newReseller = req.body
    const data = await readFilePromise("resellers.json", "utf8");
    let resellers = JSON.parse(data);

    const reseller = resellers.find(_id);

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Reseller Not Found"
      });
    }

    reseller.first_name = newReseller.first_name;
    reseller.last_name = newReseller.last_name;
    reseller.emailid = newReseller.emailid;
    reseller.password = newReseller.password;
    reseller.mobileno = newReseller.mobileno;

    const indexOfreseller = resellers.findIndex(
      (reseller) => reseller.ID === id
    );
    console.log(indexOfreseller);

    resellers.splice(indexOfreseller, 1, reseller);
    resellers = JSON.stringify(resellers);

    const writeFile = await writeFilePromise("resellers.json", resellers);
    if (writeFile === true) {
      return res.status(200).json({
        success: true,
        message: "reseller successfully updated",
        data: reseller,
      });
    }
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Failed !! Reseller Not Updated",
        data: error.message,
      });
  }
};

exports.deleteReseller = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await readFilePromise("resellers.json", "utf8");
    let resellers = JSON.parse(data);

    const reseller = await resellers.find((reseller) => reseller.id === id);
    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Failed !! Reseller Not Found"
      });
    }

    const indexOfreseller = resellers.findIndex(
      (reseller) => reseller.ID === id
    );

    resellers.splice(indexOfreseller, 1);

    resellers = JSON.stringify(resellers);

    const writeFile = await writeFilePromise("resellers.json", resellers);
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

// <<<<<<<<<<<<<<<<<<<<<< CONVERTING CALLBACK FUNCTION IN A PROMISE  >>>>>>>>>>>

const readFilePromise= (fileName, encoding) => {
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

const writeFilePromise = (fileName , encoding) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(fileName,encoding,(err,data) => {
            if(err){
                reject(err)
            } else{
                resolve(data);
            }
        })
    })
}
