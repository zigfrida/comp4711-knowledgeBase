function toggleReplies(id) {
    let section = document.getElementById(id);
    let class_name = section.className;
    if(class_name == "spec_container"){
        section.className = class_name + "_show";
    } else {
        section.className = "spec_container";
    }
}