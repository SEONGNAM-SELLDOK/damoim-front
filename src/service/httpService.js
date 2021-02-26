import axios from 'axios';

class HttpService {
    call(action, url, pageSize, pageIndex, parameter) {
        var DB_DATA = [];
        return axios.get('https://api.github.com/users/mapbox')
            .then((response) => {
                console.log(response.data);

                for (let i = 0; i < 1000; i++) {
                    DB_DATA.push({
                        name: "John" + i,
                        date: "1900-05-20",
                        hobby: "coding and coding repeat" + i,
                        address: "No.1 Century Avenue, Shanghai" + i,
                    });
                }
                return {items: DB_DATA, totalCount: 100};
            });
    }
}

export default new HttpService();
