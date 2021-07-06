let spoilerHeaders = document.querySelectorAll('.spoiler-header');

if (spoilerHeaders) {
  for (let i = 0; i < spoilerHeaders.length; i++) {
    spoilerHeaders[i].addEventListener('click', () => {
      let thisSpoilerHeader = spoilerHeaders[i];
      thisSpoilerHeader.classList.toggle('active');
      let content = thisSpoilerHeader.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }
}
