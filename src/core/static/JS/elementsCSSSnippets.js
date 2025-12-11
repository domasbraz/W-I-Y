const nav = `<style>
nav
{
    display: flex;
    width: 100%;
    height: 5vh;
    background-color: rgb(56, 56, 56);
    align-items: center;
    box-shadow: 2px 0 5px black;
    z-index: 99;
}

nav > ul
{
    list-style: none;
    height: inherit;
    display: inherit;
    align-items: inherit;
    gap: 5%;
}

nav > ul > li
{
    display: inherit;
    list-style: none;
    box-sizing: border-box;
    user-select: none;
}

nav > ul> li > a:hover
{
    cursor: pointer;
    background-color: rgb(72, 72, 72);
}

nav > ul> li > a
{
    border-radius: 10px;
    font-size: 30px;
    padding: 10px;
    display: block;
    color: white;
    text-decoration: none;
    height: 100%;
    width: 100%;
}
</style>`

const cssSnippets = new Map([["navbarSnippet", nav]])

export default cssSnippets