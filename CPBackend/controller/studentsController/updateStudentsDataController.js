import axios from "axios";
import pkg from "statuses";
const {message} = pkg;
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMDdmNzgxOS0wYTIwLTRkMzktYjFiNy00NGQzNzkwY2MzMGEiLCJpYXQiOjE3Mzc4MDUyOTMsImV4cCI6NDEwMjQ0NDgwMH0.UEBVVHTlQI1hTLxBle8D5DdM2EXsCNuLjv1E_rE5Jqc';
const baseUrl = 'https://mysports.cyferd.cloud';
const collectionId = '23bf21b7-6322-45f8-b156-c09b56aebe8e';

export async function updateStudentsData(req, res){
    try {
        const {recordId, name, phoneNumber, class:standard} = req.body;
        const fieldToUpdate = {
            record : {

            }
        };
        if(!recordId){
            return res.status(400).json({message: "Record id is required!"});
        }
        if(name){
            fieldToUpdate.record.name = name;
        }
        if(phoneNumber){
            fieldToUpdate.record.phoneNumber = phoneNumber;
        }
        if(standard){
            fieldToUpdate.record.class =  standard;
        }
        if(Object.keys(fieldToUpdate).length === 0 ){
            return res.status(400).json({message: "At least one field is required."})
        }
        const result = await axios.patch(`${baseUrl}/api/v2/data/${collectionId}/${recordId}`, fieldToUpdate, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
        res.status(200).json(result.data.list);

    } catch (error) {
        console.log("error in updating student's record ", error);
    }
}