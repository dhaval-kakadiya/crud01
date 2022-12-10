const fs = require("fs");

// <<<<<<<<<<<<<<<<<<<<<<< READ ALL DATA FROM ORDER >>>>>>>>>>>>>>>>>

exports.getAllData = async (req, res) => {
    try {
        const order_data = await readFilePromise('orders.json', 'utf8')
        const orders = JSON.parse(order_data)
        return res.status(200).json({
                  success: true,
                  message: "Successfully Data Read From order",
                  data: orders,
                });
    }catch (error) {
        return res.status(500).json({
                  success: false,
                  message: "Failed !! Data Not Read From order",
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
