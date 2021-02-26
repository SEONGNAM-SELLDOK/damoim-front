import axios from 'axios';

class HttpService {
    call(action, url, pageSize, pageIndex, parameters) {
        if (action == 'get') {
            return this.getMethod(url, pageSize, pageIndex, parameters);
        } else if (action == 'post') {
            return this.postMethod(url, parameters);
        } else if (action == 'put') {
            return this.putMethod(url, parameters);
        } else if (action == 'delete') {
            return this.deleteMethod(url, parameters);
        }
    }

    deleteMethod(url, parameters) {
        return axios.put(url, parameters)
            .then((response) => {
                var DB_DATA = [];
                for (let i = 0; i < 20; i++) {
                    DB_DATA.push({
                        name: "John" + i,
                        date: "1900-05-20",
                        hobby: "coding and coding repeat" + i,
                        address: "No.1 Century Avenue, Shanghai" + i,
                    });
                }
                return {items: DB_DATA, totalCount: DB_DATA.length};
            });
    }

    putMethod(url, parameters) {
        return axios.put(url, parameters)
            .then((response) => {
                var DB_DATA = [];
                for (let i = 0; i < 20; i++) {
                    DB_DATA.push({
                        name: "John" + i,
                        date: "1900-05-20",
                        hobby: "coding and coding repeat" + i,
                        address: "No.1 Century Avenue, Shanghai" + i,
                    });
                }
                return {items: DB_DATA, totalCount: DB_DATA.length};
            });
    }

    postMethod(url, parameters) {
        return axios.post(url, parameters)
            .then((response) => {
                var DB_DATA = [];
                for (let i = 0; i < 20; i++) {
                    DB_DATA.push({
                        name: "John" + i,
                        date: "1900-05-20",
                        hobby: "coding and coding repeat" + i,
                        address: "No.1 Century Avenue, Shanghai" + i,
                    });
                }
                return {items: DB_DATA, totalCount: DB_DATA.length};
            });
    }

    getMethod(url, pageSize, pageIndex, parameters) {
        parameters['pageSize'] = pageSize;
        parameters['pageIndex'] = pageIndex;

        return axios.get(url, {
            params: parameters,
        })
            .then((response) => {
                var DB_DATA = [];
                for (let i = 0; i < 20; i++) {
                    DB_DATA.push({
                        name: "John" + i,
                        date: "1900-05-20",
                        hobby: "coding and coding repeat" + i,
                        address: "No.1 Century Avenue, Shanghai" + i,
                    });
                }
                return {items: DB_DATA, totalCount: DB_DATA.length};
            });
    }
}

export default new HttpService();
