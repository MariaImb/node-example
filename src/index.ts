//en typescript no usamos los require, usamos los imports. instalar los types que me pida express

import express from "express";
import {product} from "./products";
var cors = require("cors");
import bodyParser from "body-parser";
const app = express();

//para permitir a cualquier servidor hacer peticiones
app.use(cors());

//para que pueda entender los objetos json cuando vienen datos de peticion post
app.use(express.json())
app.use(bodyParser.json());

//para que cuando vengan datos de una peticion post pueda entender los campos que vienen desde ahi
app.use(express.urlencoded({extended: false}))


app.get("/product", (req, res) => {
    res.status(200).json(product);
});

app.post("/product", (req, res) => {
    const { name, brand, price } = req.body;
    console.log(req.body)
    try {
        if (!name && !brand) throw new Error("che pasame el name y marca");
        product.push({ id: new Date().getTime(), name, brand, price});
        res.status(200).json(product.slice(-1));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

app.put("/product", (req, res) => {
    const { name, brand, price, id } = req.body;
    const index = product.findIndex((product) => product.id === id);
    if (index === -1)
        return res.status(400).json({ message: "no se encontro el producto" });
    product[index] = { ...product[index], name, brand, price };
    res.status(200).json(product[index]);
});

app.delete("/product/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = product.findIndex((product) => product.id === id);

    if (index === -1)
        return res.status(400).json({ message: "product could not be found" });

    return res.status(200).json(product.splice(index, 1));
});

app.listen(3000);
