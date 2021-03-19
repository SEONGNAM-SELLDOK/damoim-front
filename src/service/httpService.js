import axios from 'axios';

class HttpService {
    call(action, url, pageSize, pageIndex, parameters) {
        url = process.env.VUE_APP_URL + url;
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

    deleteMethod(url) {
        return axios.delete(url)
            .then((response) => {
                return {success: true};
            });
    }

    putMethod(url, parameters) {
        return axios.put(url, parameters)
            .then((response) => {
                return {success: true};
            });
    }

    postMethod(url, parameters) {
        return axios.post(url, parameters, {
            // headers:{
            //     'Content-Type' : 'multipart/form-data'
            // }
        })
            .then((response) => {
                return {success: true};
            });
    }

    getMethod(url, pageSize, pageIndex, parameters) {
        parameters['pageSize'] = pageSize;
        parameters['pageIndex'] = pageIndex;

        return axios.get(url, {
            params: parameters,
        })
            .then((response) => {
                // modal.methods.showModal();
                if (url == 'http://localhost:8080/seminar/pages' || url == 'http://localhost:8080/study/pages') {
                    return {items: response.data.content, totalCount: response.data.totalElements};
                } else {
                    return {items: response.data, totalCount: response.data.length};
                }

            });
    }
}

export default new HttpService();
