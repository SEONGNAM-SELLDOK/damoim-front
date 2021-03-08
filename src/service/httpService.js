import axios from 'axios';

class HttpService {
    call(action, url, pageSize, pageIndex, parameters) {
        url = "http://118.67.130.14:8080" + "/" + url;
        console.log(process.env)
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
        return axios.post(url, parameters)
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
                return {items: response.data, totalCount: response.data.length};
            });
    }
}

export default new HttpService();
