class UserModel {
    constructor(data) {
        this.id = data?.id;
        this.first_name = data?.first_name;
        this.last_name = data?.last_name;
        this.country_id = data?.country_id;
        this.passport_number = data?.passport_number;
        this.phone_number = data?.phone_number;
        this.email = data?.email;
        this.note = data?.note;
        this.role_id = data?.role_id;

    }
}

export default UserModel;