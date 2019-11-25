function toggleReplies(id) {
    let section = document.getElementById(id);
    let class_name = section.className;
    if(class_name == "spec_container"){
        section.className = class_name + "_show";
    } else {
        section.className = "spec_container";
    }
}

async function nextPage() {
    let url = window.location.href;
    let split = url.split("/");
    let currentPage = split[split.length - 1][0];
    let nextPage = parseInt(currentPage) + 1;
    let newUrl = "";
    for (let index = 0; index < split.length - 2; index++) {
        newUrl += split[index];
    }
    newUrl += "/page/" + nextPage + "?";
    let testUrl = "/page/" + nextPage + "?"

    console.log(newUrl);

    // console.log(testUrl);
    let resposnse = await fetch(new URL(newUrl));

    // fetch(new URL(newUrl), {
    //     method: 'GET',
    // }).catch((err) => {
    //     console.error(err);
    // });
}

function previousPage() {
    let url = window.location.href;
    let split = url.split("/");
    let currentPage = split[split.length - 1][0];
    let previousPage = parseInt(currentPage) - 1;
    console.log(previousPage);
}
