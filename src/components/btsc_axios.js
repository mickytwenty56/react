import Axios from "axios";

const btsc_service_url = "http://btsc-service-1121295126.us-east-2.elb.amazonaws.com";
//const btsc_service_url = "http://192.168.229.130:8080";

const btsc_axios = Axios.create({
    baseURL: btsc_service_url
});

export default btsc_axios;