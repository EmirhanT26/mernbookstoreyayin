const users = [
    { name: "user1@mail.com", password: "passs1" },
    { name: "user2@mail.com", password: "passs2" },
    { name: "user3@mail.com", password: "passs3" },
    { name: "user4@mail.com", password: "passs4" }
]

export const loginUser = (username, password) => {
    return users.find(val=> val.name ===username && val.password===password) ? true:false
    
    // for(let i = 0; i < users.length; i++) {
    //     if(users[i].name === username && users[i].password === password)
    //         return true
    // }
    return false
}