
const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  var scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  var scrollWidth = Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
  );
  window.alert(`Ширина видимой части документа: ${width}px,
Высота видимой части документа: ${height}px,
Ширина всего документа: ${scrollWidth}px,
Высота всего документа: ${scrollHeight}px.`);
});
