'use strict'

module.exports = `
<div class="editor-wrapper">

  <!-- Editor -->
  <div class="panel-left">
    <textarea class="json-input" tabindex="1"></textarea>
  </div>

  <!-- Pannel splitter -->
  <div class="splitter">
  </div>

  <!-- Output -->
  <div class="panel-right">

    <!-- Set tabindex to -1 so that it can't be reached (caused bug that showed pannel) -->
    <textarea class="filter-output" tabindex="-1"></textarea>
  </div>
</div>

<!-- Bottom bar / filter input -->
<div class="bottom-wrapper hidden">
  <div class="filter-icon-wrapper">
    <img class="filter-icon">
  </div>
  <input class="filter-input" tabindex="2">
</div>
`
