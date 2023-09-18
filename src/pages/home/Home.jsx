import React from "react";
import classes from "./Home.module.scss";
import {Card} from "antd";


const Home = () => {

    return (

        <div className={classes["container"]}>
            <p>HELLO & WELCOME</p>
            <span>
                   How it works
                </span>

            <div className={classes["cards"]}>
                <Card className={classes["card"]} title="Car support" bordered={false}>
                    <span>Always at your service! </span>
                </Card>
                <Card className={classes["card"]} title="Reservation anytime" bordered={false}>
                    <span> 24/7 bookings. Seamless, simple, and always available.</span>
                </Card>
                <Card className={classes["card"]} title="Lots of locations" bordered={false}>
                    <span> Find us in numerous locations. </span>
                </Card>
            </div>
        </div>
    )
}


export default Home;
