import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance.js";

// FOR GETTING ALL POSTS
export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/post/allposts");
      console.log(res);
      dispatch({
        type: "ALL_POSTS",
        payload: res.data.posts,
      });
    } catch (error) {
      console.log("Get All Post Action Error: ", error);
    }
  };
};

// // FOR CREATING A POST
// export const createPost = (data) => {
//   return async (dispatch) => {
//     try {
//       const res = await axiosInstance.post("/post/create", data);
//       console.log(res);
//       dispatch({
//         type: "CREATE_POST",
//         payload: res,
//       });
//       if(res){
//         toast.success("Post Created!")
//       }
//     } catch (error) {
//       console.log("Create Post Action Error: ", error);
//       toast.error(error.response.data.message)
//     }

//   }
// }


// // FOR UPDATING A POST
// export const updatePost = () => {
//   return async (dispatch) => {
//     try {
//       console.log("hello");
//       const res = await axiosInstance.post("/auth/logout");
//       console.log(res);
//       dispatch({
//         type: "LOGOUT",
//         payload: null,
//       });
//       if(res){
//         toast.success("You've Logged Out successfully.")
//       }
//     } catch (error) {
//       console.log("Logout Action Error: ", error);
//     }
//   };
// };

// // FOR GETTING A POST
// export const postById = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       // console.log(res);
//       console.log(res.data);
//       dispatch({
//         type: "SET_USER",
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log("CheckAuth Action Error: ", error);
//     }
//   };
// };

// // FOR DELETING A POST
// export const deletePost = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       // console.log(res);
//       console.log(res.data);
//       dispatch({
//         type: "SET_USER",
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log("CheckAuth Action Error: ", error);
//     }
//   };
// };
