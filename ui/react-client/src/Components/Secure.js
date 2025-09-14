import React from "react";
import { callApi } from "../helpers/axios_helper";

const SecuredPage = () => {
    const studentList = callApi();
    console.log(studentList);

    return (
        <div>Secured Page</div>
    )
}

export default SecuredPage;