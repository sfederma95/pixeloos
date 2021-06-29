import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
const DEV_APPROVAL_KEY = process.env.DEV_APPROVAL_KEY || 'thissupersecretkeyfornow'

class AnimalsApi {
    static token;
    static async login(data){
        let res = await axios.post(`${BASE_URL}/users/login`,data)
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.user
    }
    static async register(data){
        let res = await axios.post(`${BASE_URL}/users/new`,data)
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.user
    }
    static async getUser(usr_id) {
        try {
            let res = await axios.get(`${BASE_URL}/users/${usr_id}`,{
                headers: {
                    Authorization: `Bearer ${AnimalsApi.token}`
                }
            })
            return res.data.user;
        } catch(err){
            let msg = err.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg]
        }
    }
    static async addGold(usr_id, gold){
        try{
            let res = await axios.put(`${BASE_URL}/gold/add`,{usr_id:usr_id, goldToAdd: gold, devKey: DEV_APPROVAL_KEY})
            return res.data.gold_amt;
        } catch(err){
            let msg = err.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg]
        }
    }
    static async newPet(data,usr_id){
        let res = await axios.post(`${BASE_URL}/pets/new/${usr_id}`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.user
    }
    static async buyItem(data, usr_id, goldDec){
        data.devKey = DEV_APPROVAL_KEY;
        let res = await axios.post(`${BASE_URL}/inventories/add`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        let res2 = await axios.put(`${BASE_URL}/gold/dec`,{usr_id:usr_id, goldToDec: goldDec},{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        if (res2.data.error){
            throw res2.data.error.msg
        }
        return res.data.newInv;
    }
    static async feedPet(data, usr_id, pet_id){
        let res = await axios.put(`${BASE_URL}/pets/${usr_id}/${pet_id}/feed`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.pet;
    }
    static async playPet(data, usr_id, pet_id){
        let res = await axios.put(`${BASE_URL}/pets/${usr_id}/${pet_id}/play`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.pet;
    }
    static async removeItem(data){
        const headers = {
            Authorization: `Bearer ${AnimalsApi.token}`
          }
        let res = await axios.delete(`${BASE_URL}/inventories/remove`, {headers,data});
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.newInv;
    }
}


export default AnimalsApi