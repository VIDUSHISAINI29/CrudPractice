import axios from "axios";
import pkg from "statuses";

const { message } = pkg;

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMDdmNzgxOS0wYTIwLTRkMzktYjFiNy00NGQzNzkwY2MzMGEiLCJpYXQiOjE3Mzc4MDUyOTMsImV4cCI6NDEwMjQ0NDgwMH0.UEBVVHTlQI1hTLxBle8D5DdM2EXsCNuLjv1E_rE5Jqc';
const baseUrl = 'https://mysports.cyferd.cloud';
const collectionId = '23bf21b7-6322-45f8-b156-c09b56aebe8e';
export async function addStudentsData(req, res){
    try {
       const {name, class: standard, phoneNumber} = req.body;
        const dataToPost = {
           record :{
            name,
            class:standard,
            phoneNumber
           }
        }
        const postData = await axios.post(`${baseUrl}/api/v2/data/${collectionId}`, dataToPost, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        res.status(200).json({data:postData.data.list,
                              message: "Student detail added successfull."
        })
    } catch (error) {
        console.log("error in posting data ", error);
        
    }
}