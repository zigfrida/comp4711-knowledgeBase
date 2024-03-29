function toggleReplies(id) {
    let section = document.getElementById(id);
    let class_name = section.className;
    if (class_name == "spec_container") {
        section.className = class_name + "_show";
    } else {
        section.className = "spec_container";
    }
}

function nextPage() {
    let url = window.location.href;
    let split = url.split("=");
    let newUrl = "";
    if (split.length == 1) {
        newUrl += "/?page=1";
    } else {
        let currentPage = split[split.length - 1][0];
        newUrl += "/?page=" + (parseInt(currentPage) + 1);
    }
    window.location.href = newUrl;
}

function previousPage() {
    let url = window.location.href;
    let split = url.split("=");
    let newUrl = "";
    if (split.length == 1) {
        return;
    } else {
        let currentPage = parseInt(split[split.length - 1][0]);
        if (currentPage <= 0) {
            return;
        } else {
            newUrl += "/?page=" + (currentPage - 1);
        }
    }
    window.location.href = newUrl;
}