
exports.initWikiPage = () => {
  const pageTitle = decodeURIComponent(location.href.split(/\//g).pop())
  console.log(pageTitle)
}
