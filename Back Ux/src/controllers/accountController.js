const account = require('../models/Account');

const getAllAccounts = async() =>{
    const accounts = await account.find();
    return accounts;
}

const createAccount= async (body) =>{
    const newAccount = new account({
        nAccount:body.nAccount,
        clp_balance:body.clp_balance || 0,
        cabildo_balance:body.cabildo_balance || 0,
        transferHistory:body.transferHistory || [],
        chat:body.chat || [],
        listUsers:body.listUsers || [],
    });
    const storeInMongoDB = await newAccount.save();
    return storeInMongoDB;
}


const getAccount = async(id) => {
    const accountAux = await account.findById({_id:id});
    return accountAux;
}

//Añadir entrada al chat de la cuenta
const updateChat = async(id,body)=>{
    const accountAux = await getAccount(id);
    accountAux.chat.push(body.post);
    await accountAux.save();
    return accountAux;
}

//Añadir entrada al registro de transferencias de la cuenta
const updateTransferHistory = async(id,body)=>{
    const accountAux = await getAccount(id);
    accountAux.transferHistory.push(body.post);
    await accountAux.save();
    return accountAux;
}

const deleteAccount = async(id)=>{
    const accountAux = await account.findByIdAndDelete(id);
    return accountAux;
}

//añade un usuario a la cuenta (se hace desde la ruta de usuario)
const addUser = async(idUser, idAccount)=>{
    const accountAux = await getAccount(idAccount);
    accountAux.listUsers.push(idUser);
    await accountAux.save();
    return accountAux;
}



//La inicia el usuario
const transfer = async(id, body)=>{
    const account1 = await getAccount(id);
    const account2 = await getAccount(body.id);
    if(body.type == 'clp'){
        if(account1.clp_balance >= body.amount){
            account2.clp_balance =  account2.clp_balance + body.amount;//Se suma al destinatario
            account1.clp_balance =  account1.clp_balance - body.amount;//Se resta al emisor
        }
    }  
    if(body.type == 'cabildo'){
        if(account1.cabildo_balance >= body.amount){
            account2.cabildo_balance =  account2.cabildo_balance + body.amount;//Se suma al destinatario
            account1.cabildo_balance =  account1.cabildo_balance - body.amount;//Se resta al emisor
        }
    }
    else{
        //error
    }
    await account1.save();
    await account2.save();
    return account1;
}

module.exports = {getAllAccounts,createAccount,getAccount, updateChat,updateTransferHistory, deleteAccount,addUser, transfer}