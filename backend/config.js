export const  DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export function randombalance(){
    return (Math.random()*10000) + 1
}