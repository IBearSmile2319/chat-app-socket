const baseUrl= "http://localhost:8080/api/"

export const fetchNotToken= async (endPoint, data, method="GET") => { 
    const url= baseUrl + endPoint
    if(method == "GET"){
        const resp= await fetch(url);
        return await resp.json()
    }else{
        const resp= await fetch(url,{
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        return await resp.json()
    }
}
export const fetchToken= async (endPoint, data, method="GET") => { 
    const url= baseUrl + endPoint
    const token= localStorage.getItem("token") || ''
    if(method == "GET"){
        const resp= await fetch(url,{
            headers: {
                'x-token':token
            }
        });
        return await resp.json()
    }else{
        const resp= await fetch(url,{
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token':token
            },
            body: JSON.stringify(data),
        })
        return await resp.json()
    }
}

