import axios from "axios";

export const getData = async () => {
    let response = await axios.get("http://localhost:8080/HRC81532W/dataloading");
    let data = response.data.Bills;
    data.map((Bills, index) => ({ ...Bills, "id": index }))
    return data;
}


getData();

