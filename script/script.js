function saveNote() {
    const title = document.getElementById("titleEntry").value;
    const content = document.getElementById("content").innerHTML;

    const note = {
        title: title,
        content: content
    };

    localStorage.setItem("currentNotes", JSON.stringify(note));
}

function changeTheme() {
    if (themeBtn.classList.contains(darkNWhitemode.dark)) {
        themeBtn.classList.remove(darkNWhitemode.dark);
        themeBtn.classList.add(darkNWhitemode.light);

        document.querySelector(":root").classList.remove("dark-theme");
        document.querySelector(":root").classList.add("light-theme");
    } else {
        themeBtn.classList.remove(darkNWhitemode.light);
        themeBtn.classList.add(darkNWhitemode.dark);

        document.querySelector(":root").classList.remove("light-theme");
        document.querySelector(":root").classList.add("dark-theme");
    }
}

function fnClear() {
    title.value = "";
    content.innerHTML = "";
    saveNote();
}

function fnPannelExport() {
    if (pannelExport.style.display == "none") {
        pannelExport.style.display = "block";
    } else {
        pannelExport.style.display = "none";
    }
}

function fnExport() {
    const title = document.getElementById("titleEntry").value;
    let content = document.getElementById("content").innerText;
    //content = content.replace(/\n\n\n/g, "\r\n"); // Replace <br> with new line characters
    // content = content.replace(/&nbsp;/g, " "); // Replace &nbsp; with spaces

    const blob = new Blob([content], { type: "text/plain" });
    console.log("Blob content:", blob);

    const url = URL.createObjectURL(blob);
    console.log("Blob URL:", url);

    const a = document.createElement("a");
    a.href = url;
    a.download = title + ".txt";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
}

function fnTools() {
    if (tools.style.display === "none") {
        tools.style.display = "block";

        btnTools.classList.remove("fa-plus");
        btnTools.classList.add("fa-minus");
    } else {
        tools.style.display = "none";

        btnTools.classList.remove("fa-minus");
        btnTools.classList.add("fa-plus");
    }
}

function setStyle(fontType, style) {
    let selec = window.getSelection().getRangeAt(0);
    console.log("Selection:", selec);
    console.log("Selection text:", selec.toString());
    if (selec.toString().length > 0) {
        let span = document.createElement("span");

        span.style[fontType] = style;


        span.innerText = selec;
        selec.deleteContents();
        selec.insertNode(span);

    }

    saveNote();
}

function setBold() {
    setStyle("fontWeight", "bold");
}

function setItalic() {
    setStyle("fontStyle", "italic");
}


function setH(typeH) {
    let selec = window.getSelection().getRangeAt(0);
    console.log("Selection:", selec);
    console.log("Selection text:", selec.toString());
    if (selec.toString().length > 0) {
        let h = document.createElement(typeH);

        if (typeH === "h1") {
            h.style.fontSize = "2em";
        } else if (typeH === "h2") {
            h.style.fontSize = "1.5em";
        } else if (typeH === "h3") {
            h.style.fontSize = "1.2em";
        }

        h.innerText = selec;
        selec.deleteContents();
        selec.insertNode(h);

    }

    saveNote();
}

function setH1() {
    setH("h1");
}
function setH2() {
    setH("h2");
}
function setH3() {
    setH("h3");
}



// NAV
const importer = document.getElementById("importer");
const exporter = document.getElementById("exporter");
const themeBtn = document.getElementById("btnTheme");
const darkNWhitemode = {dark:"fa-sun-o", light:"fa-moon-o"};

// Pannel EXPORT
const pannelExport = document.getElementById("pannelExport");


// TOOLS
const btnTools = document.getElementById("btnTools");
const tools = document.getElementById("tools");
let offsetHeight, offsetWidth;


// NOTES
const title = document.getElementById("titleEntry");
const content = document.getElementById("content");

// SAVING
const importsSaving = [];



// LOCAL STORAGE
if (localStorage.getItem("currentNotes")) {
    const currentNotes = JSON.parse(localStorage.getItem("currentNotes"));
    title.value = currentNotes.title;
    content.innerHTML = currentNotes.content;
}


// EVENT LISTENERS

content.addEventListener("input", () => {
    saveNote();
})
title.addEventListener("input", () => {
    saveNote();
})

importer.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            title.value = file.name.split(".")[0];
            
            let contentFile = e.target.result;
            contentFile = contentFile.replace(/\n/g, "<br>");

            content.innerHTML = contentFile;

            importsSaving.push({
                title: title.value,
                content: contentFile
            });

            localStorage.setItem("currentNotes", JSON.stringify({title: title.value, content: contentFile}));
            localStorage.setItem("importsSaving", JSON.stringify(importsSaving));

        };    

        reader.readAsText(file);
    }


    console.log("Imports Saving:", importsSaving);
});





// TOOLS MOVEMENT 

tools.addEventListener("mousedown", e => {
    offsetHeight = e.clientY - tools.offsetTop;
    offsetWidth = e.clientX - tools.offsetLeft;
    tools.style.cursor = "grabbing";
})

tools.addEventListener("mousemove", e => {
    if (e.buttons === 1) {
        tools.style.left = `${e.clientX - offsetWidth}px`;
        tools.style.top = `${e.clientY - offsetHeight}px`;
    }
})

tools.addEventListener("mouseup", e => {
    tools.style.cursor = "grab";
})
