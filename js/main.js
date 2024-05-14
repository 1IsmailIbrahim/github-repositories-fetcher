let input = document.querySelector(".get-repos input");
let btn = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");
let reg = /^[a-zA-Z0-9]+$/;

btn.onclick = function () {
    if (reg.test(input.value) === true) {
        getRepos();
        input.value = ""
    } else {
        document.querySelector(".show-data span").style.color = "red"
        document.querySelector(".show-data span").innerHTML = "Invalid Username"
    }
};

// Get Repos Function
async function getRepos() {
    reposData.innerHTML = ""
    let myData = await fetch(`https://api.github.com/users/${input.value}/repos`)
    let data = await myData.json()
    for (let i = 0; i < data.length; i++) {
        // Create the main div
        let div = document.createElement("div");
        let divTxt = document.createTextNode(data[i].name)
        div.className = "repo-box"
        div.appendChild(divTxt)
        // Create a span that contains stars
        let span = document.createElement("span");
        let spanTxt = document.createTextNode(`Stars ${data[i].stargazers_count}`);
        span.appendChild(spanTxt)
        // Create the link to visit 
        let a = document.createElement("a");
        let aTxt = document.createTextNode(`Visit`);
        a.href = data[i].svn_url
        a.setAttribute("target", "_blank")
        a.appendChild(aTxt)
        // Add Elements to reposData to show in page
        reposData.appendChild(div)
        div.appendChild(a)
        div.appendChild(span)
    }
};