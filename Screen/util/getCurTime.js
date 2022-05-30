
export const getCurTime = () => {
    let date = parseInt(new Date().getDate()).toString().padStart(2, '0');
    let month = parseInt(new Date().getMonth() + 1).toString().padStart(2, '0');
    let year = parseInt(new Date().getFullYear()).toString();
    let hours = parseInt(new Date().getHours()).toString().padStart(2, '0');
    let min = parseInt(new Date().getMinutes()).toString().padStart(2, '0');
    let sec = parseInt(new Date().getSeconds()).toString().padStart(2, '0');
    let milli = new Date().getMilliseconds();

    let curTime = `${year}-${month}-${date} ${hours}:${min}:${sec}.${milli}`;
    
    return curTime;
}

export const getCurDate = () => {
    let date = parseInt(new Date().getDate()).toString().padStart(2, '0');
    let month = parseInt(new Date().getMonth() + 1).toString().padStart(2, '0');
    let year = parseInt(new Date().getFullYear()).toString();

    let curTime = `${year}-${month}-${date}`;
    
    return curTime;
}

export const getYesterDate = () => {
    let today = new Date();
    let yesterday = new Date(today.setDate(today.getDate()-1));
    let date = parseInt(yesterday.getDate()).toString().padStart(2, '0');
    let month = parseInt(yesterday.getMonth() + 1).toString().padStart(2, '0');
    let year = parseInt(yesterday.getFullYear()).toString();

    let curTime = `${year}-${month}-${date}`;
    
    return curTime;
}

export const timeCompare = (time) => {
    
    let t1 = {
        'year':time.slice(0, 4),
        'month':time.slice(5, 7), 
        'day':time.slice(8, 10), 
        'hour':time.slice(11, 13), 
        'min':time.slice(14, 16), 
        'sec':time.slice(17, 19)
    };

    let t2 = {
        'year':new Date().getFullYear(),
        'month':new Date().getMonth() + 1, 
        'day':new Date().getDate(), 
        'hour':new Date().getHours(), 
        'min':new Date().getMinutes(), 
        'sec':new Date().getSeconds()
    };

    if(parseInt(t1.year) != parseInt(t2.year)) {
        return t1.year+'/'+t1.month+'/'+t1.day;
    }

    if(parseInt(t1.month) != parseInt(t2.month)) {
        return t1.month+'/'+t1.day;
    }

    if(parseInt(t1.day) != parseInt(t2.day)) {
        if(parseInt(t2.day) - parseInt(t1.day) > 7) {
            return t1.month+'/'+t1.day;
        }else {
            return (parseInt(t2.day) - parseInt(t1.day)) + '일 전';
        }
    } else {
        // 날짜는 같은데 시간이 다른경우
        if(parseInt(t1.hour) != parseInt(t2.hour)) {
            if(parseInt(t2.hour) - parseInt(t1.hour) > 0) {
                return (parseInt(t2.hour) - parseInt(t1.hour)) + '시간 전';
            } else {
                return (60 + parseInt(t2.min) - parseInt(t1.min)) + '분 전';
            }
        } else {
            // 시간은 같은데 분이 다른경우
            if(parseInt(t1.min) != parseInt(t2.min)) {
                return (parseInt(t2.min) - parseInt(t1.min)) + '분 전';
            } else {
                return (parseInt(t2.sec) - parseInt(t1.sec)) + '초 전';
            }
        }
    }
         
}