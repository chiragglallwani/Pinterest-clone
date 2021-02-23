import axios from "axios";

export default axios.create({
    baseurl: "https:/api.unsplash.com/",
    headers:{
        Authorization: "Client-ID thyq4QTceSg8Ee8BeFun_QP5XDRjVeuOUK9XKcO3L38"
    }
});