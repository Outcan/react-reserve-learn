import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { page, size } = req.query;
  // Convert querystring values to  numbers
  const pageNum = +page;
  const pageSize = +size;
  try {
    let products = [];
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if (pageNum === 1) {
      products = await Product.find().limit(pageSize);
    } else {
      const skips = pageSize * (pageNum - 1);
      products = await Product.find()
        .skip(skips)
        .limit(pageSize);
    }
    //const products = await Product.find();
    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error("Error: ", error.message);
  }
};
