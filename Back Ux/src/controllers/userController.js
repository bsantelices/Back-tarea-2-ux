const user = require('../models/User');


const getAllUsers = async() =>{
    const users = await user.find();
    return users;
}

const createUser= async (body) =>{
    const newUser = new user({
        name:body.name,
        lastname:body.lastname,      
        username:body.username,
        clp_balance:body.clp_balance || 0,
        cabildo_balance:body.cavildo_balance || 0,
        listAccounts:body.listAccounts,
    });
    const storeInMongoDB = await newUser.save();
    return storeInMongoDB;
}


const getUser = async(id) => {
    const userAux = await user.findById({_id:id});
    return userAux;
}


const updateUserById = async(body,id)=>{
    const userAux = await user.findByIdAndUpdate({_id:id}, body, {new:true, useFindAndModify: false});
    return userAux;
}


const deleteUserById = async(id)=>{
    const userAux = await user.findByIdAndDelete(id);
    return userAux;
}



const transfer = async(id, body)=>{
    const user1 = await getUser(id);
    const user2 = await getUser(body.id);
    if(body.type == 'clp'){
        if(user1.clp_balance >= body.amount){
            user2.clp_balance =  user2.clp_balance + body.amount;//Se suma al destinatario
            user1.clp_balance =  user1.clp_balance - body.amount;//Se resta al emisor
        }
    }  
    if(body.type == 'cabildo'){
        if(user1.cabildo_balance >= body.amount){
            user2.cabildo_balance =  user2.cabildo_balance + body.amount;//Se suma al destinatario
            user1.cabildo_balance =  user1.cabildo_balance - body.amount;//Se resta al emisor
        }
    }
    else{
        //error
    }
    await user1.save();
    await user2.save();
    return user1;
}



module.exports = {getAllUsers,createUser,getUser, updateUserById, deleteUserById, transfer}