const express = require('express');
const router = express.Router();
const {getAllAccounts,createAccount,getAccount, updateChat,updateTransferHistory, deleteAccount} = require('../controllers/accountController');


// Obtener todas las cuentas
router.get('/',async(req,res,next)=>{
    try{
        const cuentas = await getAllAccounts();
        res.status(200).json({
            data:cuentas,
            menssage:'Lista de cuentas'
        })
    }catch(err){
        next(err);
    }
})

//Crear una cuenta
router.post('/',async(req,res,next)=>{
    try{
        const createAccountAux = await createAccount(req.body);
        res.status(201).json({
            data:createAccountAux,
            menssage:'Cuenta creada'
        })
    }catch(err){
        next(err);
    }
})

//Obtener una cuenta
router.get('/:id',async(req,res,next)=>{
    const {id} = req.params;
    try{
        const account = await getAccount(id);
        res.status(200).json({
            data:account
        })
    }catch(err){
        next(err);
    }
})


//Actualizar el chat (añadir un post) (en el body mandar un campo post: "Usuario: mensaje")
router.put('/addChat/:id',async(req,res,next)=>{
    const {id}=req.params;
    try{
        const account = await updateChat(id,req.body);
        res.status(200).json({
            data: account,
            message: `Se a añadido un post al chat de la cuenta: ${account.nAccount}`
        })
    }catch(err){
        next(err);
    }
})

//Actualizar el historial de transacciones(en el body mandar un campo post: "Cuenta ... realizo una tranferencia a la cuenta ...")
router.put('/addHistory/:id',async(req,res,next)=>{
    const {id}=req.params;
    try{
        const account = await updateTransferHistory(id,req.body);
        res.status(200).json({
            data: account,
            message: `Se a añadido un post al historial de transacciones de la cuenta: ${account.nAccount}`
        })
    }catch(err){
        next(err);
    }
})

//Eliminar una cuenta
router.delete('/:id',async(req,res,next)=>{
    const {id}=req.params;
    try{
        const account = await deleteAccount(id);
        res.status(200).json({
            data:account,
            menssage:`Cuenta eliminada :${account.nAccount}`
        })
    }catch(err){
        next(err);
    }
})



module.exports= router;