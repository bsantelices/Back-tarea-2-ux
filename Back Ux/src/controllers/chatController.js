const chat = require('../models/Chat');

const getAllChats = async() =>{
    const chats = await chat.find();
    return chats;
}

const createChat= async (body) =>{
    const newChat = new chat({
        name:body.name,
        posts:body.posts || []
    });
    const storeInMongoDB = await newChat.save();
    return storeInMongoDB;
}


const getChat = async(id) => {
    const chatAux = await chat.findById({_id:id});
    return chatAux;
}

//Añadir entrada
const updateChat = async(id,body)=>{
    const chatAux = await getChat(id);
    chatAux.posts.push(body.post);
    await chatAux.save();
    return chatAux;
}


const deleteChat = async(id)=>{
    const chatAux = await chat.findByIdAndDelete(id);
    return chatAux;
}






module.exports = {getAllChats,createChat,getChat, updateChat, deleteChat}