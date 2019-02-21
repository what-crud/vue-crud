export const crud = {
    fieldModifiers: {
        dateFromTimestamp: (param) => {
            return param.substring(0, 10)
        },
        timeFromTimestamp: (param) => {
            let tmp = param || ''
            return tmp.substring(0, 5)
        },
        datetimeFromTimestamp: (param) => {
            return '<nobr>' + param.substring(0, 19) + '</nobr>'
        },
        croppedText: (param) => {
            return (param == null || param.length < 100) ? param : param.substring(0, 100) + '...'
        },
        list: (param) => {
            return param ? param.map(obj => obj.tableList).join(', ') : ''
        },
        listTasks: (param) => {
            return param ? param.map(obj => {
                return obj.task.name
            }).join('<br>') : ''
        },
        lastReset: (param) => {
            if (param.length > 0) {
                return '<nobr>' + param[param.length - 1].reset_time.substring(0, 19) + '</nobr>'
            }
        }
    }
}