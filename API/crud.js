export async function getData(url) {
    let result = await fetch(url, {
        method: "GET",
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => {
        // 여기서 return은 result로 빠짐
        //console.log(response);
        if(response["status"] == 200) {
            return response.json();
        } else {
            return [];
            // data가 null로 되어있어도 NaN 오류가 난다. 
            // 그냥 실패, 데이터 없는 경우 모두 일단 []을 넘겨버리니까
            // NaN, overflow 오류는 사라졌다.
            return response["status"];
        }        
    })
    .catch(error => {
        console.log('ERROR!!, crud.js <getData> => ', error);
        return [];
        return 404;
    });
    return result;
}

export async function putData(url, data) {
    //console.log('crud.js -', data)
    let result = await fetch(url, {
        method: "PUT",
        //body: JSON.stringify(data),
        body: JSON.stringify(data),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => {
        // 여기서 return은 result로 빠짐
        return response
    })
    .catch(error => {
        console.log('ERROR!!, crud.js <putData> => ', error);
        return error;
    });
    return result;
}

export async function postData(url, data) {
    //console.log('crud.js -', data)
    let result = await fetch(url, {
        method: "POST",
        //body: JSON.stringify(data),
        body: JSON.stringify(data),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => {
        // 여기서 return은 result로 빠짐
        return response
    })
    .catch(error => {
        console.log('ERROR!!, crud.js <postData> => ', error);
        return error;
    });
    return result;
}

export async function postMainBoard(data) {
    //console.log('crud.js -', data)
    let url = 'http://192.168.1.243:4000/boardPost'
    let result = await fetch(url, {
        method: "POST",
        //body: JSON.stringify(data),
        body: JSON.stringify(data),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => {
        // 여기서 return은 result로 빠짐
        return response
    })
    .catch(error => {
        console.log('ERROR!!, crud.js <postMainBoard> => ', error);
        return error;
    });
    return result;
}