
exports.initWikiPage = () => {
  const pageTitle = decodeURIComponent(window.location.href.split(/\//g).pop())
  console.log(pageTitle)
}
