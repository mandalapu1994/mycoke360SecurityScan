import axios from "axios";
const timeOut = 25000; // Set timeout to 25 seconds (in milliseconds)
import { store } from "../redux/store";
import { SET_LOADER } from "../redux/Reducer/loaderReducer";
import { LogAPiService, LogService } from "../utils/CommonServices";
import Analytics from 'appcenter-analytics';
import { Toaster } from "../components/Toaster/toaster";



const newAxiosInstance = axios.create({
  timeout: timeOut,
});

newAxiosInstance.interceptors.request.use(
  (config) => {
    // store.dispatch(SET_LOADER(true))
    // You can modify the request config here
    // For example, add an authorization token
    // config.headers.Authorization = `Bearer your_token`;
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
newAxiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    // For example, return response.data
    // store.dispatch(SET_LOADER(false))

    // console.log('1111111response', response)
    return response.data;
  },
  (error) => {
    // Handle response error here
    if (error.code === 'ECONNABORTED') {
      // Request timed out
    } else {
      // Handle other errors
    }
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  timeout: timeOut,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("CONFIGG",config)
    store.dispatch(SET_LOADER(true))
    // You can modify the request config here
    // For example, add an authorization token
    // config.headers.Authorization = `Bearer your_token`;
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    // For example, return response.data
    store.dispatch(SET_LOADER(false))

    // console.log('1111111response', response)
    return response.data;
  },
  (error) => {
    store.dispatch(SET_LOADER(false))
    // Handle response error here
    if (error.code === 'ECONNABORTED') {
      // Request timed out
    } else {
      // Handle other errors
    }
    return Promise.reject(error);
  }
);

export const doGet = (url, params, headers) => {
  return axiosInstance
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      params: params
    })
    .catch((error) => {
      Toaster("Something went wrong,Try again later!")
      let apiDetails ={
        url:url,
        headers:headers,
        Payload:params
      }

      LogAPiService(error?.message ?? JSON.stringify(error), apiDetails)
    });
};


export const doGetNew = (url, params, headers) => {
  return newAxiosInstance
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      params: params
    })
    .catch((error) => {
      Toaster("Something went wrong,Try again later!")
      console.log("ERRRO DOGET NEWwer", error)
      let apiDetails ={
        url:url,
        headers:headers,
        Payload:params

      }
      
      LogAPiService(error?.message ?? JSON.stringify(error), apiDetails)
      // Handle errors specific to this request if needed
    });
};





// export const doGet = (url, params, headers) => {
//   console.log("==headers",headers)
//   return axios
//     .get(url, {
//       headers: {
//         "Content-Type": "application/json",
//         ...(headers || {}),
//       },
//       params: params
//     })
//     .catch((error) => {
//       // Handle errors specific to this request if needed
//       if (error.code === "ECONNABORTED") {
//         console.error("Request timed out");
//       } else {

//         console.error('error===doGet',error);
//       }
//     });
// };
// export const doGet = (url, params, headers) => {
//   console.log("==headers",headers)
//   return axios
//     .get(url, {
//       headers: {
//         // Authorization: "Bearer your_token",
//         "Content-Type": "application/json",
//         ...(headers || {}),
//       },
//       params:params,
//       timeout: timeOut,
//     })
//     .then((response) => {
//       console.log("response data fetch api=",response.data);
//       return response.data
//     })
//     .catch((error) => {
//       if (error.code === "ECONNABORTED") {
//         console.error("Request timed out");
//       } else {
//         console.error('error===doGet',error);
//       }
//     });
// };

// export const doPost = (url, body, headers) => {
//   console.log("doPost=",url)
//   return axiosInstance
//     .post(url, body, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(headers || {}),
//       },
//     })
//     .catch((error) => {
//       // Handle errors specific to this request if needed
//     });
// };
export const doPost = (url, body, headers) => {
  return axios
    .post(url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      timeout: timeOut,
    })
    .then((response) => {
    store.dispatch(SET_LOADER(false))

      return response.data;
    })
    .catch((error) => {

      if (error.code === "ECONNABORTED") {
        console.error("Request timed out");
      } else {
        Toaster("Something went wrong,Try again later!")
        // Other Errors
        let apiDetails ={
          url:url,
          headers:headers,
          Payload:body
        }
        
        LogAPiService(error?.message ?? JSON.stringify(error), apiDetails)

        console.error(error);
      }
    store.dispatch(SET_LOADER(false))
      return false
    });
};

// export const doPut = (url, body, headers) => {
//   return axios
//     .put(url, body, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(headers || {}),
//       },
//       timeout: timeOut,
//     })
//     .then((response) => {
//       return response.data;
//     })

//     .catch((error) => {
//       if (error.code === "ECONNABORTED") {
//         console.error("Request timed out");
//       } else {
//         // Other Errors
//         console.error(error);
//       }
//     });
// };

export const doPut = (url, body, headers) => {
  return axiosInstance
    .put(url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    })
    .catch((error) => {
      // Handle errors specific to this request if needed
    });
};

export const doDelete = (url, body, headers) => {
  return axiosInstance
    .delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    })
    .catch((error) => {
      // Handle errors specific to this request if needed
    });
};
// export const doDelete = (url, body, headers) => {
//   return axios
//     .delete(url, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(headers || {}),
//       },
//       data: body,
//       timeout: timeOut,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       if (error.code === "ECONNABORTED") {
//         console.error("Request timed out");
//       } else {
//         console.error(error);
//       }
//     });
// };
