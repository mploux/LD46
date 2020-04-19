class Dom
{
    get(element)
    {
        const prefix = element[0];
        const name = element.substring(1);
        
        if (prefix === '#')
            return document.getElementById(name);
        else if (prefix === '.')
            return document.getElementsByClassName(name);
        else
            return document.getElementById(element);
    }
}

export default new Dom();