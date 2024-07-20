import axios from 'axios';

const apiUrl = 'http://192.168.1.111:5000';

export const getHello = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
