import htmlSnippets from "./elementsHTMLSnippets.js"
import cssSnippets from "./elementsCSSSnippets.js"

htmlSnippets.forEach((value, key) => 
{
    loadSnippetPreview(key, value)
})

let btns = document.getElementsByTagName("button")

for (let i = 0; i < btns.length; i++)
{
    let btn = btns[i]

    let classes = btn.classList

    if (classes.contains("codeTab"))
    {
        btn.addEventListener("click", displayTab)
        continue
    }
    if (classes.contains("copyText"))
    {
        btn.addEventListener("click", copyToClipboard)
        continue
    }
}

function displayTab(event)
{
    let element = event.target

    let classes = element.classList

    // note to self: this can be made better
    if (classes.contains("previewTab"))
    {
        displayPreview(element)
        return
    }
    if (classes.contains("htmlTab"))
    {
        displayHTML(element)
        return
    }
    if (classes.contains("cssTab"))
    {
        displayCSS(element)
        return
    }
    if (classes.contains("fullTab"))
    {
        displayFull(element)
        return
    }
}

function copyToClipboard(event)
{
    let element = event.target
    element = element.parentElement.parentElement.parentElement
    let codeTag = element.getElementsByTagName("code")[0]

    navigator.clipboard.writeText(codeTag.textContent)
    animateTooltip(element)
}

function loadSnippetPreview(key, value)
{
    let element = document.getElementById(key)
    let sampTag = element.getElementsByTagName("samp")[0]
    element.getElementsByTagName("code")[0].style.display = "none"
    element.getElementsByClassName("copy")[0].style.display = "none"
    sampTag.style.display = "block"

    sampTag.innerHTML = `<div class='preview'>${value}</div>`
}

function setActive(element)
{
    let tabContainer = element.parentElement
    let tabs = tabContainer.children

    for (let i = 0; i < tabs.length; i++)
    {
        let tab = tabs[i]
        if (tab == element)
        {
            tab.classList.add("activeTab")
            continue
        }

        tab.classList.remove("activeTab")
        
    }
}

function displayPreview(element)
{
    setActive(element)
    // button > span > div.snippet > div#snippetID
    let snippetID = element.parentElement.parentElement.parentElement.id

    let htmlSnippet = htmlSnippets.get(snippetID)

    loadSnippetPreview(snippetID, htmlSnippet)
}

function displayHTML(element)
{
    setActive(element)

    let snippetElement = element.parentElement.parentElement.parentElement

    let htmlSnippet = htmlSnippets.get(snippetElement.id)

    let codeText = document.createTextNode(htmlSnippet)

    let codeTag = snippetElement.getElementsByTagName("code")[0]
    codeTag.innerHTML = ""
    codeTag.style.display = "block"

    let sampTag = snippetElement.getElementsByTagName("samp")[0]
    sampTag.style.display = "none"

    let copyElement = snippetElement.getElementsByClassName("copy")[0]
    copyElement.style.display = "flex"

    codeTag.appendChild(codeText)
}

function displayCSS(element)
{
    setActive(element)

    let snippetElement = element.parentElement.parentElement.parentElement

    let cssSnippet = cssSnippets.get(snippetElement.id)
    cssSnippet = cssSnippet.replaceAll("<style>", "")
    cssSnippet = cssSnippet.replaceAll("</style>", "")
    cssSnippet = cssSnippet.trim()
    let codeText = document.createTextNode(cssSnippet)

    let codeTag = snippetElement.getElementsByTagName("code")[0]
    codeTag.innerHTML = ""
    codeTag.style.display = "block"

    let sampTag = snippetElement.getElementsByTagName("samp")[0]
    sampTag.style.display = "none"

    let copyElement = snippetElement.getElementsByClassName("copy")[0]
    copyElement.style.display = "flex"

    codeTag.appendChild(codeText)
}

function displayFull(element)
{
    setActive(element)

    let snippetElement = element.parentElement.parentElement.parentElement

    let cssSnippet = cssSnippets.get(snippetElement.id)

    let htmlSnippet = htmlSnippets.get(snippetElement.id)

    let htmlText = document.createTextNode(htmlSnippet)
    let cssText = document.createTextNode(cssSnippet)

    let codeTag = snippetElement.getElementsByTagName("code")[0]
    codeTag.innerHTML = ""
    codeTag.style.display = "block"

    let sampTag = snippetElement.getElementsByTagName("samp")[0]
    sampTag.style.display = "none"

    let copyElement = snippetElement.getElementsByClassName("copy")[0]
    copyElement.style.display = "flex"

    codeTag.appendChild(htmlText)
    codeTag.innerHTML += "<br><br>" 
    codeTag.appendChild(cssText)   
}
let tooltipAnimation = null
function animateTooltip(element) 
{
    clearInterval(tooltipAnimation)
    let tooltip = element.parentElement.parentElement.getElementsByClassName("tooltip")[0]
    let pos = 0;
    let opacity = 100;
    tooltip.style.marginTop = "0"
    tooltip.style.opacity = "100%"
    tooltip.style.display = "block"
    tooltipAnimation = setInterval(frame, 1)
    function frame() 
    {
        if (pos <= -40) 
        {

            if (opacity <= 0)
            {
                tooltip.style.display = "none"
                clearInterval(tooltipAnimation)
            }
            else
            {
                opacity -= 0.2
                tooltip.style.opacity = opacity + "%"
            }
        } 
        else 
        {
            pos -= 0.25;
            tooltip.style.marginTop = pos + "px"
        }
    }
}