const fs = require("fs");
const { exec } = require("child_process");

const PRODUCTS = [
  {
    title: "CodeCuff",
    price: 9.99,
    image: "images/band-1.jpeg",
  },
  {
    title: "BinaryBoost",
    price: 49.99,
    image: "images/shoe-7.jpeg",
  },

  {
    title: "Code Breaker",
    price: 29.99,
    image: "images/shirt-1.jpeg",
  },
  {
    title: "CodeCrafters",
    price: 39.99,
    image: "images/shoe-6.jpeg",
  },
  {
    title: "DevLink",
    price: 9.99,
    image: "images/band-2.jpeg",
  },
  {
    title: "AlgorithmAir",
    price: 39.99,
    image: "images/shoe-4.jpeg",
  },
  {
    title: "Binary Brigade",
    price: 24.99,
    image: "images/shirt-3.jpeg",
  },
  {
    title: "CodeSole",
    price: 39.99,
    image: "images/shoe-2.jpeg",
  },
  {
    title: "SyntaxStrap",
    price: 9.99,
    image: "images/band-3.jpeg",
  },
  {
    title: "ByteKicks",
    price: 39.99,
    image: "images/shoe-1.jpeg",
  },
  {
    title: "Byte Me",
    price: 34.99,
    image: "images/shirt-4.jpeg",
  },

  {
    title: "HackHightops",
    price: 49.99,
    image: "images/shoe-3.jpeg",
  },
  {
    title: "SyntaxSneakers",
    price: 49.99,
    image: "images/shoe-5.jpeg",
  },
  {
    title: "Hello World",
    price: 19.99,
    image: "images/shirt-2.jpeg",
  },
  {
    title: "CodeChrono",
    price: 9.99,
    image: "images/band-4.jpeg",
  },
];

const importProducts = (productsFile) =>
  new Promise((resolve) => {
    exec(`npx convex import products ${productsFile}`, resolve);
  });

const getUploadUrl = () =>
  new Promise((resolve, reject) => {
    exec(
      "npx convex run --no-push images:generateUploadUrl",
      (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(stdout.trim().replace(/"/g, ""));
      }
    );
  });

const getImage = (image) =>
  new Promise((resolve, reject) => {
    fs.readFile(`scripts/${image}`, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const fileBuffer = Buffer.from(
        data.buffer,
        data.byteOffset,
        data.byteLength
      );
      resolve(fileBuffer);
    });
  });

const uploadProduct = async (title, price, type, image) => {
  const blob = await getImage(image);
  const uploadUrl = await getUploadUrl();

  const uploadReq = await fetch(uploadUrl, {
    headers: {
      "Content-Type": "image/jpeg",
    },
    method: "POST",
    body: blob,
  });
  const uploadRes = await uploadReq.json();

  return {
    title,
    price,
    type,
    imageId: uploadRes.storageId,
  };
};

(async () => {
  const data = [];
  for (const product of PRODUCTS) {
    console.log(product.image);
    data.push(
      await uploadProduct(
        product.title,
        product.price,
        product.type,
        product.image
      )
    );
  }
  fs.writeFileSync(
    "products-with-images.jsonl",
    data.map((d) => JSON.stringify(d)).join("\n")
  );
  await importProducts("products-with-images.jsonl");
  fs.unlinkSync("products-with-images.jsonl");
})();
