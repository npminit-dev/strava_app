export const getUrlWithParams = (url:string, params:Record<string,string>) => {
  const queryString = new URLSearchParams(params).toString();
  return `${url}?${queryString}`
}

export const sleep = (ms:number) => new Promise((res) => setTimeout(() => res(null), ms))