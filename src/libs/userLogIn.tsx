export default async function userLogIn(userEmail:string,userPassword:string){
    const response = await fetch("https://backend-gilt-five-89.vercel.app/api/v1/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/JSON"
        },
        body:JSON.stringify({
             email:userEmail,
             password:userPassword
        })
    })
    if(!response.ok){
        throw new Error("Failed to log-in")
    }

    return await response.json()
}