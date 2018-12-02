module.exports = class UserInfo{
    constructor(email,password,USER_ROLE_role_id){
        this.email=email;
        this.password=password;
        this.USER_ROLE_role_id=USER_ROLE_role_id;
    }
    get userInfo(){
        return {email:this.email,password:this.password};
    }
}