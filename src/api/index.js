import config from '../consants.json'

export const getMessages = () => {
    return fetch(config.URL + '/get-messages').then((response) => {
        return response.json();
    })
        .then((data) => {
            return data;
        });
};
export const sendMessageFunction = async (data) => {
    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response.json();
    }

    await postData(config.URL + '/add-message', {data}).then((res) => {return res});


};

export const deleteMessageFunction = (id) => {
  return  fetch(config.URL + '/delete-message/' + id, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => console.log(res))
}
