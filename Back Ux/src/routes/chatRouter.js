const express = require('express');
const router = express.Router();
const {getAllChats,createChat,getChat, updateChat, deleteChat} = require('../controllers/chatController');


// Obtener todos los chats
router.get('/',async(req,res,next)=>{
    try{
        const chats = await getAllChats();
        res.status(200).json({
            data:chats,
            menssage:'Lista de chats'
        })
    }catch(err){
        next(err);
    }
})

//Crear un chat
router.post('/',async(req,res,next)=>{
    
    try{
        const createChatAux = await createChat(req.body);
        res.status(201).json({
            data:createChatAux,
            menssage:'Chat creado'
        })
    }catch(err){
        next(err);
    }
})

//Obtener un chat
router.get('/:id',async(req,res,next)=>{
    const {id} = req.params;
    try{
        const chat = await getChat(id);
        res.status(200).json({
            data:chat
        })
    }catch(err){
        next(err);
    }
})


//Actualizar un chat (añadir un post) (en el body mandar un campo post: "algo")
router.put('/add/:id',async(req,res,next)=>{
    const {id}=req.params;
    try{
        const chat = await updateChat(id,req.body);
        res.status(200).json({
            data: chat,
            message: `Se a añadido un post al chat: ${chat.name}`
        })
    }catch(err){
        next(err);
    }
})

//Eliminar un chat
router.delete('/:chatId',async(req,res,next)=>{
    const {chatId}=req.params;
    try{
        const chat = await deleteChat(chatId);
        res.status(200).json({
            data:chat,
            menssage:`chat eliminado :${chat.item}`
        })
    }catch(err){
        next(err);
    }
})



module.exports= router;