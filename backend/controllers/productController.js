import { sql } from "../config/db.js";

export const getProducts= async(req,res)=>{
   try {
    const products=await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
    `;
    res.status(200).json({success:true,data:products});
   } catch (error) {
    console.log("error getProducts",error);
    res.status(500).json({success:false,message:error.message});
   }
};
export const createProduct=async(req,res)=>{
    const {name,price,image}=req.body;
    if(!name || !price || !image){
       return  res.status(400).json({success:false,message:"All fields are required"})
    }
    try {
        const newProduct=await sql`
        INSERT INTO products(name,price,image)
        VALUES (${name},${price},${image})
        RETURNING *
        `
        console.log("new product is added",newProduct);
        res.status(201).json({success:true,data:newProduct[0]});
    } catch (error) {
        console.log("error createProduct",error);
        res.status(500).json({success:false,message:error.message});
    }
};
export const getProduct=async(req,res)=>{
    const {id}=req.params;
    try {
        const product=await sql`
            SELECT * FROM products WHERE id=${id}
        `
        console.log("got the product",product);
        res.status(200).json({success:true,data:product[0]});
    } catch (error) {
        console.log("error getProduct",error);
        res.status(500).json({success:false,message:error.message});
    }
};
export const updateProduct=async(req,res)=>{
    const {id}=req.params;
    const {name,price,image}=req.body;

    try {
        const updatetheproduct=await sql`
        UPDATE products
        SET name=${name},price=${price},image=${image}
        WHERE id=${id}
        RETURNING *
        `
        if(updatetheproduct.length ===0){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        res.status(200).json({success:true,data:updateProduct[0]});
    } catch (error) {
        console.log("error updateProduct",error);
        res.status(500).json({success:false,message:error.message});
    }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletetheProduct = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *
    `;

    if (deletetheProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: deletetheProduct[0] });
  } catch (error) {
    console.log("error DeleteProduct", error);
    res.status(500).json({ success: false, message: error.message });
  }
};