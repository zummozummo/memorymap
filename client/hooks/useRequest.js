import axios from "axios";
import { useState } from "react";


export default ({ url, method, body }) => {


    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    return doRequest
}