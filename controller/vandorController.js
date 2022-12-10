const fs = require("fs");

// <<<<<<<<<<<<<<<<<<<<<<< READ ALL DATA FROM VANDOR >>>>>>>>>>>>>>>>>

exports.getAllVandor = async (req, res) => {
    try {
        const vendor_data = await readFilePromise('vendors.json', 'utf8')
        const vendors = JSON.parse(vendor_data)
        return res.status(200).json({
                  success: true,
                  message: "Successfully Data Read From vendor",
                  data: vendors,
                });
    }catch (error) {
        return res.status(500).json({
                  success: false,
                  message: "Failed !! Data Not Read From vendor",
                  error: error.message,
                });
    }
}

// <<<<<<<<<<<<<<<<<<<<<< CONVERTING CALLBACK FUNCTION IN A PROMISE  >>>>>>>>>>>

const readFilePromise = (fileName,encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
