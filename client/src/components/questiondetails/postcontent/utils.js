import { re_email, re_url, re_url_target_blank, re_target_blank } from "../../../utils/regex"

export const sterlizeContentAsNormalString = (text) => {
    const markDownLinks = String(text).match(/\[.+\]\(.+\)/g)
    var sterlizedText = text
    markDownLinks?.forEach(link => {
        // eslint-disable-next-line
        const [_, aLink] = link.split("](")
        const cleanedLink = aLink.replace(")", "")
        const cleanedEmail = cleanedLink.match(re_email)
        if (cleanedEmail?.length && cleanedEmail[0]) {
            sterlizedText = sterlizedText.replace(link, cleanedEmail[0])
        }
        const targetBlank = sterlizedText.match(re_url_target_blank) !== null
        if (targetBlank) {
            sterlizedText = sterlizedText.replace(re_target_blank, "")
        }
        sterlizedText = sterlizedText.replace(link, cleanedLink)
    })
    return sterlizedText
}

export const renderLinksInContent = (text) => {
    const markDownLinks = String(text).match(/\[.+\]\(.+\)/g)
    var renderedTextWithLinks = text
    if (markDownLinks?.length) {
        markDownLinks.forEach(link => {
            const [aText, aLink] = link.split("](")
            const cleanedText = aText.replace("[", "")
            const cleanedLink = aLink.replace(")", "")
            const cleanedEmail = cleanedLink.match(re_email)
            if (cleanedEmail?.length && cleanedEmail[0]) {
                let anchorText = `<a class="link" href="mailto:${cleanedEmail[0]}">${cleanedText}</a>`
                renderedTextWithLinks = renderedTextWithLinks.replace(link, anchorText)
            }
            const targetBlank = renderedTextWithLinks.match(re_url_target_blank) !== null
            if (targetBlank) {
                renderedTextWithLinks = renderedTextWithLinks.replace(re_target_blank, "")
            }
            renderedTextWithLinks = renderedTextWithLinks.replace(link, _renderLinkInLine(cleanedLink, targetBlank, cleanedText))
        })
    }
    else {
        renderedTextWithLinks = _renderLinkInLine(text)
    }
    return renderedTextWithLinks
}
const _renderLinkInLine = (text, targetBlank = false, linkText = "") => {
    let renderText = text
    const cleanedUrl = text.match(re_url)
    if (cleanedUrl?.length && cleanedUrl[0]) {
        let anchorText = `<a class="link" href="${cleanedUrl[0]}" ${targetBlank ? 'target="_blank"' : ""}>${linkText !== "" ? linkText : cleanedUrl[0]}</a>`
        renderText = renderText.replace(cleanedUrl, anchorText)
    }
    return renderText
}