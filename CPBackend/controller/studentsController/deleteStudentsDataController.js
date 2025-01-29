import axios from "axios";
import pkg from "statuses";

const { message } = pkg;
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMDdmNzgxOS0wYTIwLTRkMzktYjFiNy00NGQzNzkwY2MzMGEiLCJpYXQiOjE3Mzc4MDUyOTMsImV4cCI6NDEwMjQ0NDgwMH0.UEBVVHTlQI1hTLxBle8D5DdM2EXsCNuLjv1E_rE5Jqc';
const baseUrl = 'https://mysports.cyferd.cloud';
const collectionId = '23bf21b7-6322-45f8-b156-c09b56aebe8e';

export async function deleteStudentsData(req, res) {
    try {
        // Extract recordId from request body
        const { recordId } = req.body;

        // Validate if recordId is provided
        if (!recordId) {
            return res.status(400).send({ message: "Record ID is required!" });
        }

        // Perform DELETE request
        const result = await axios.delete(`${baseUrl}/api/v2/data/${collectionId}/${recordId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        // Respond with success message
        res.status(200).send({
            message: "Record deleted successfully!",
            data: result.data.list,
        });
    } catch (error) {
        console.error("Error in deleting students data:", error);

        // Handle errors gracefully and send appropriate response
        const statusCode = error.response?.status || 500;
        res.status(statusCode).send({
            message: message[statusCode] || "An error occurred while deleting the record.",
            error: error.response?.data || error.message,
        });
    }
}
