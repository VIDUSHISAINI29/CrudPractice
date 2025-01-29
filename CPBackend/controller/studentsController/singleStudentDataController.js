import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMDdmNzgxOS0wYTIwLTRkMzktYjFiNy00NGQzNzkwY2MzMGEiLCJpYXQiOjE3Mzc4MDUyOTMsImV4cCI6NDEwMjQ0NDgwMH0.UEBVVHTlQI1hTLxBle8D5DdM2EXsCNuLjv1E_rE5Jqc';
const baseUrl = 'https://mysports.cyferd.cloud';
const collectionId = '23bf21b7-6322-45f8-b156-c09b56aebe8e';

export async function getSingleStudentData(req, res){
    const {recordId} = req.body;
    try {
        const result = await axios.post(`${baseUrl}/api/v2/data/${collectionId}/${recordId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const list = await new Promise((resolve, reject) => {
            if (result.data && result.data) {
                resolve(result.data);  // Resolve with the list if the data is correct
            } else {
                reject('Data not found or incorrect format');  // Reject if data is missing or incorrect
            }
        });

        res.status(200).json(list);  // Send the resolved list in the response
    } catch (error) {
        console.log("error in fetching single student's data", error);
        
    }
}