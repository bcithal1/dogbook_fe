import { geoCodingApi } from "@/api/api";
import { useQuery } from "@tanstack/react-query";



export function getGeoCoding(address:string){
    let key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API
    const {status, data} = useQuery({
        queryKey:["geocoding", address],
        queryFn: (googleMapsApiKey)=>{
            return geoCodingApi.get(`json?address=${address}&key=${key}`).then((res)=>res.data)
        }
    })
    return {status, data}

}