export default async function loadJs(url) {
  return new Promise((resolve) => {
    const scriptEl = document.createElement('script');
    const { head } = document;
    scriptEl.src = url;
    scriptEl.onload = () => {
      resolve();
    };
    head.appendChild(scriptEl);
  });
}
