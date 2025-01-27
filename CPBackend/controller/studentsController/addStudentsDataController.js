import axios from "axios";


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMDdmNzgxOS0wYTIwLTRkMzktYjFiNy00NGQzNzkwY2MzMGEiLCJpYXQiOjE3Mzc4MDUyOTMsImV4cCI6NDEwMjQ0NDgwMH0.UEBVVHTlQI1hTLxBle8D5DdM2EXsCNuLjv1E_rE5Jqc';
const baseUrl = 'https://mysports.cyferd.cloud';
const collectionId = '23bf21b7-6322-45f8-b156-c09b56aebe8e';
export async function addStudentsData(req, res){
    try {
        const name = req.body.name;
        const standard = req.body.class;
        const phoneNumber = req.body.phoneNumber;
        const dataToPost = {
           record :{
            name: name,
            class: standard,
            phoneNumber: phoneNumber,
           }
        }
        const postData = await axios.post(`${baseUrl}/api/v2/data/${collectionId}`, dataToPost, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json(postData.data.list)
    } catch (error) {
        console.log("error in posting data ", error);
        
    }
}