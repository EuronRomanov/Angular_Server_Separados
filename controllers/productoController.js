const Producto = require("../models/Producto")

exports.crearProducto= async(req, res)=> {
   try {
       let producto;
       //Creamo nuestro porducto
       producto= new Producto(req.body);

       await producto.save();
       res.send(producto);
       
   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }
}


//get data

exports.obtenerProductos=async (req, res)=>{
    try {
        const productos= await  Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
       res.status(500).send('Hubo un error');
    }
}

//update data
exports.actualizarProducto=async(req, res)=>{
    try {
        const{nombre, categoria, ubicacion, precio}= req.body;
        let producto=await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({msg: 'No existe el producto'})
        }

        producto.nombre= nombre;
        producto.categoria= categoria;
        producto.ubicacion= ubicacion;
        producto.precio= precio;

        producto= await Producto.findByIdAndUpdate({_id: req.params.id},producto,{new: true} )
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



//get data by id

exports.obtenerProducto=async (req, res)=>{
    try {
        let producto=await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({msg: 'No existe el producto'})
        }


        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//delete data

exports.eliminarProducto=async (req, res)=>{
    try {
        let producto=await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({msg: 'No existe el producto'})
        }

        await Producto.findByIdAndRemove({_id: req.params.id})
        res.json({msg:'Prodcuto eliminado'});

       
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}