import axios from "axios";

export const uploadPost = async (data) => {
  try {
    const res = await axios.post("https://api.ayrshare.com/api/post", data, {
      headers: {
        Authorization: "Bearer 42DN27X-M054ARN-QW67ZTA-3WAV71G",
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(
      "Error in uploading post: ",
      error.response?.data || error.message
    );
  }
};
