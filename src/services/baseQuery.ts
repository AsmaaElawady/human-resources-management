import axiosInstance from "./axios"

interface AxiosBaseQueryArgs {
  url: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  data?: unknown
  params?: unknown
}

export const axiosBaseQuery = async ({url, method, data}: AxiosBaseQueryArgs) =>{
    try{
        const result = await axiosInstance({url, method, data});
        return {data: result.data};
    }catch(error){
        return {error}
    }
}