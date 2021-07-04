import common from './module/common';
import init from './module/init';
import adjustHeight from './module/adjust-height';

window.addEventListener('DOMContentLoaded', function () {
  new common();
  new init();
  new adjustHeight();
});
