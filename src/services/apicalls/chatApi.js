import {streamEndPoints}from "../apis";
const {GET_STREAM_TOKEN_API} = streamEndPoints;

import { apiConnector } from "../apiConnector";
export async function getStreamToken() {
  const token = localStorage.getItem('token');
  const response = await apiConnector("GET",GET_STREAM_TOKEN_API,null,{
            Authorization: `Bearer ${token}`,
        });
        console.log("response of fetch is : " , response);
  return response.data;
}