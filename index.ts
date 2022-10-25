//en typescript no usamos los require, usamos los imports. instalar los types que me pida express

import express from "express";
var cors = require('cors')
import bodyParser from "body-parser";
const app = express();

app.use(cors())

app.use(bodyParser.json());

const product: { id: number; name: string; marca: string; precio: number }[] = [
    {
        name: "Mouse",
        marca: "Logitech",
        precio: 2000,
        id: 1,
    },

    {
        name: "Teclado",
        marca: "Logitech",
        precio: 3000,
        id: 2,
    },

    {
        name: "Auricular",
        marca: "Xiaomi",
        precio: 4000,
        id: 3,
    },
];

app.get("/product", (req, res) => {
    res.status(200).json(product);
});

app.post("/product", (req, res) => {
    const { name, marca, precio } = req.body;
    try {
        if (!name && !marca) throw new Error("che pasame el name y marca");
        product.push({ id: new Date().getTime(), name, marca, precio });
        res.status(200).json(product.slice(-1));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

app.put("/product", (req, res) => {
    const { name, marca, precio, id } = req.body;
    const index = product.findIndex((product) => product.id === id);
    if (index === -1) return res.status(400).json({message: "no se encontro el producto"});
    product[index] = {...product[index], name, marca, precio}
    res.status(200).json(product[index]);

  });

app.delete("/product", (req, res) => {
    res.status(200).json({ name: "giuliano" });
});

app.listen(3000);