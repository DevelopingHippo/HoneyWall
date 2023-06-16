var cHead = document.getElementsByTagName(“head”);
var hHead = cHead[0];
function AddModule(mFileName)
{
    var sTag = document.createElement(“script”);
    sTag.setAttribute(“src”, mFileName);
    sTag.setAttribute(“type”, “text/javascript”);
    hHead.appendChild(sTag);
}