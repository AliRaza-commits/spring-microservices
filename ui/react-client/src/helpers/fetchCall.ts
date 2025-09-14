  export const fetchCall = async (method: string, url: string,headers:any,body:any) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers,
            body
          });

          const data = await response.json();
          return data;
    } catch(error) {
      return error;
    }
  }