import axios from 'axios';

export async function judgeCreate(code) {
    const options = {
        method: 'POST',
        url: 'http://localhost:2358/submissions/?base64_encoded=true&wait=false',
        
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "source_code": code,
            "language_id": 52
            
          }
    };

    try {
        console.log(code+" this is the api call code ")
        const response = await axios.request(options);
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw the error for handling in the component
    }
}

export async function judgeGetSubmission(token) {
    const options = {
        method: 'GET',
        url: `http://localhost:2358/submissions/${token}?base64_encoded=true&fields=*`,
       
    };

    try {
        const response = await axios.request(options);
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw the error for handling in the component
    }
}
