let siteId = document.getElementById("siteName")
let siteLink = document.getElementById("siteURL")
let siteList = []
let addButton = document.getElementById("addButton")
addButton.addEventListener("click", addSites)

if (localStorage.getItem("siteList") != null) {
    siteList = JSON.parse(localStorage.getItem("siteList"))

    showSite()
}

function addSites() {
    let site = {
        siteName: siteId.value,
        siteURL: siteLink.value,
    }
    let nameRegex = /^[a-z A-z]{2,15}[0-9]{0,10}$/
    let httpsRegex = /^https:\/\//
    if (httpsRegex.test(site.siteURL) && nameRegex.test(site.siteName)) {
        if (localStorage.getItem("siteList") == null) {
            siteList.push(site)
            localStorage.setItem("siteList", JSON.stringify(siteList))
            document.querySelector(".error1").style.display = "none"
            document.querySelector(".error2").style.display = "none"

            showSite()
        }
        else {
            let tempList = JSON.parse(localStorage.getItem("siteList"))
            let test = 0
            tempList.forEach(el => {
                if (el.siteName == siteId.value || el.siteURL == siteLink.value) {
                    test++
                }
            })
            if (test == 0) {
                siteList.push(site)
                localStorage.setItem("siteList", JSON.stringify(siteList))
                document.querySelector(".error1").style.display = "none"
                document.querySelector(".error2").style.display = "none"

                showSite()
            }
            else {
                document.querySelector(".error2").style.display = "block"
                document.querySelector(".error1").style.display = "none"
            }
        }
    }
    else {
        document.querySelector(".error1").style.display = "block"
        document.querySelector(".error2").style.display = "none"
    }

}
function showSite() {


    let temp = ``
    siteList.forEach((el, i) => {
        temp += `<tr><td>${i + 1}</td>
        <td>${el.siteName}</td>
        <td><a href=${el.siteURL} target="_blank"  class="btn btn-outline-warning">visit</a></td>
        <td><button onclick="delSites(${i})" class="btn btn-outline-danger">Delete</button></td></tr>
        </tr>`
    })
    document.getElementById("tableBody").innerHTML = temp

}
function delSites(x) {
    siteList.splice(x, 1)
    localStorage.setItem("siteList", JSON.stringify(siteList))
    showSite()
}