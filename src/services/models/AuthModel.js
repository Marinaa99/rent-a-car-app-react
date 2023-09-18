class AuthModel {
    constructor(data) {
        this.access_token = data?.access_token;
        this.email =  data?.email;
    }

}

export default AuthModel;