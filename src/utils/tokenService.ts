import Cookies from "js-cookie"

export const getDataFromCookie = (title: string) => {
  return Cookies.get(title);
};
export const saveDataFromCookie = (title: any , value:any) => {
    Cookies.set(title , value)
}
export const deleteDataFromCookie = (title:string) => {
  Cookies.remove(title);
}
export const isAunthenticated = ():boolean =>{
  return !!getDataFromCookie("token")
}