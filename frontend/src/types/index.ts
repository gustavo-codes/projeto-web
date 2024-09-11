export type Post = {
        id:number,
        title: string,
        text:string,
        data:[]
    
}

export type Community = {
        id:number,
        attributes:{
            description:string,
            name:string,
            posts:{
                data:Post[]
            }
            adms:{
                data:User[]
            }
        }
}

export type User = {
        attributes:{
            username:string
            posts:{
                data:Post[]
            }
        }   
}