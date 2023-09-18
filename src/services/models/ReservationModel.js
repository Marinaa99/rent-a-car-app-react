class ReservationModel {
    constructor(data) {
        this.id = data?.id;
        this.customer = data?.customer;
        this.first_name = data?.customer.first_name;
        this.last_name = data?.customer.last_name;
        this.vehicle = data?.vehicle;
        this.plate_number = data?.vehicle.plate_number;
        this.pickup_location = data?.pickup_location.name;
        this.date_from = data?.date_from;
        this.date_to = data?.date_to;
        this.drop_off_location = data?.drop_off_location.name;
        this.price = data?.price;

    }

}

export default ReservationModel;