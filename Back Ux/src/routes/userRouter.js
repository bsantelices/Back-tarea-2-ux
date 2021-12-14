const express = require('express');
const router = express.Router();
const {getAllUsers,createUser,getUser, updateUserById, deleteUserById, addAccount, makeTransfer} = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/',async(req,res,next)=>{
    try{
        const usuarios = await getAllUsers();
        res.status(200).json({
            data:usuarios,
            menssage:'Lista de usuarios'
        })
    }catch(err){
        next(err);
    }
})

//Crear un usuario
router.post('/',async(req,res,next)=>{
    
    try{
        const createUsuario = await createUser(req.body);
        res.status(201).json({
            data:createUsuario,
            menssage:'Usuario creado'
        })
    }catch(err){
        next(err);
    }
})

//Obtener un usuario en base al id
router.get('/:id',async(req,res,next)=>{
    const {id} = req.params;
    try{
        const usuario = await getUser(id);
        res.status(200).json({
            data:usuario
        })
    }catch(err){
        next(err);
    }
})


//Actualizar un usuario
router.put('/:userId',async(req,res,next)=>{
    const {userId} = req.params;
    try{
        const usuario = await updateUserById(req.body,userId);
        res.status(200).json({
            data:usuario,
            menssage:`Usuario actualizado: ${usuario.item}`
        })
    }catch(err){
        next(err);
    }
})


//Añadir una cuenta al usuario (en el body mandar el id de la cuenta)
router.put('/addAccount/:userId',async(req,res,next)=>{
    const {userId} = req.params;
    try{
        const usuario = await addAccount(userId,req.body);
        res.status(200).json({
            data:usuario,
            menssage:`Usuario actualizado: ${usuario.name}`
        })
    }catch(err){
        next(err);
    }
})

//Eliminar un usuario
router.delete('/:userId',async(req,res,next)=>{
    const {userId}=req.params;
    try{
        const usuario = await deleteUserById(userId);
        res.status(200).json({
            data:usuario,
            menssage:`Usuario eliminado :${usuario.name}`
        })
    }catch(err){
        next(err);
    }
})



// Tranferencia (en la ruta se manda el id de la cuenta de origen, 
//     en el body van estos 3 campos:
//                         
//    "id": "61b6884c39b4056ae69e242c", (de la cuenta de destino)
//    "type": "clp",
//    "amount": 1000
//         )
router.put('/tranfer/:id',async(req,res,next)=>{
    const {id}=req.params;
    try{
        const accountAux = await makeTransfer(id,req.body);
        res.status(200).json({
            data: accountAux,
            message: `Se a realizado la transferencia por parte de : ${accountAux.nAccount}`
        })
    }catch(err){
        next(err);
    }
})



module.exports= router;