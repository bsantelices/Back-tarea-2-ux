const user = require('../models/User');
const {transfer, addUser} = require('../controllers/accountController');


const getAllUsers = async() =>{
    const users = await user.find();
    return users;
}

const createUser= async (body) =>{
    const newUser = new user({
        name:body.name,
        lastname:body.lastname,      
        rut:body.rut,
        password:body.password,
        listAccounts:body.listAccounts || [],
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


const addAccount = async(id, body)=>{
    const userAux = await getUser(id);
    userAux.listAccounts.push(body.account);
    const accountAux = await addUser(id, body.account);// Se añade a la cuenta
    await userAux.save();
    return userAux;
}


const makeTransfer = async(id, body)=>{
    const account = await transfer(id, body);
    return account;
}



module.exports = {getAllUsers,createUser,getUser, updateUserById, deleteUserById, addAccount, makeTransfer}