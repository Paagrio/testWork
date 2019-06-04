import Axios from "axios";

const url = "http://localhost:64316/";

export default Axios.create({ baseURL: url });