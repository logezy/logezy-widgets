
export const stripHtmlTags = (html: string | undefined): string => {
  if (html) {
    const temp = document.createElement('div')

    temp.innerHTML = html

    return temp.textContent || temp.innerText
  }

  return 'No description available'
}