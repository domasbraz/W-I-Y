const nav = `<nav>
    <ul>
        <li><a href='#'>Item</a></li>
        <li><a href='#'>Item</a></li>
        <li><a href='#'>Item</a></li>
    </ul>
</nav>`

const htmlSnippets = new Map([["navbarSnippet", nav]])

htmlSnippets.forEach((value, key) => 
{
    loadSnippetPreview(key, value)
})

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