function parseIntIfNumber (str) {
    return !/\D/.test(str) ? parseInt(str) : str
}
function download (path, filename) {
    var a = document.createElement('a')
    a.href = path + '/' + filename
    a.download = filename
    a.click();
}
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        // : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        : ['KB','MB','GB','TB','PB','EB','ZB','YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

export {
    parseIntIfNumber,
    download,
    humanFileSize
}