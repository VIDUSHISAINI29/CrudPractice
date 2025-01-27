import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMDdmNzgxOS0wYTIwLTRkMzktYjFiNy00NGQzNzkwY2MzMGEiLCJpYXQiOjE3Mzc4MDUyOTMsImV4cCI6NDEwMjQ0NDgwMH0.UEBVVHTlQI1hTLxBle8D5DdM2EXsCNuLjv1E_rE5Jqc';
const baseUrl = 'https://mysports.cyferd.cloud';
const collectionId = '23bf21b7-6322-45f8-b156-c09b56aebe8e';

export async function getStudentsData(req, res) {
    try {
        const result = await axios.get(`${baseUrl}/api/v2/data/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                
            },
        });
        res.setHeader('Content-Type', 'application/json');


        // Use Promise to wrap the result processing logic
        const list = await new Promise((resolve, reject) => {
            if (result.data && result.data.list) {
                resolve(result.data.list);  // Resolve with the list if the data is correct
            } else {
                reject('Data not found or incorrect format');  // Reject if data is missing or incorrect
            }
        });

        console.log('result = ', list);  // This will log the resolved list
        res.status(200).json(list);  // Send the resolved list in the response
       
    } catch (error) {
        console.error('Error fetching students data:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        res.status(500).json({ error: error.message });  // Send the error as a response
    }
}
