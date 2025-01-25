import axios from "axios";
const token = process.env.CYFERD_TOKEN
const collectionId = process.env.CYFERD_COLLECTION_ID
const baseUrl = process.env.CYFERD_BASE_URL
export async function getStudentsData(){
    const result = await axios.get(`${baseUrl}/api/v2/data/${collectionId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    console.log('result = ', result);
    
}