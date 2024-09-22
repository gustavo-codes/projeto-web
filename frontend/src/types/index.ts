export type Post = {
        id:number,
        title: string,
        text:string,
        publishedAt:string,
        community:Community,
        auth:User,
    
}

export type Community = {
        id:number,
        description:string,
        name:string,
        posts:Post[]
        adms:User[]
        
}

export type User = {
        username:string
        id:Number
        email:string
        role:{
            name:string
        }
        
}