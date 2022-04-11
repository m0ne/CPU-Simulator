<!-- SPDX-License-Identifier: GPL-2.0-only -->
<!--
/* GCSx64 - x86_64 Graphical CPU Simulator
 *
 * Copyright © 2021 by Eliane Schmidli <seliane.github@gmail.com> and Yves Boillat <yvbo@protonmail.com>
 * Modified 2021 by Michael Schneider <michael.schneider@hispeed.com> and Tobias Petter <tobiaspetter@chello.at>
 *
 * This file is part of GCSx64 - x86_64 Graphical CPU Simulator
 *
 * GCSx64 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 2 of the License only.
 *
 * GCSx64 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GCSx64.  If not, see <https://www.gnu.org/licenses/>.
 */
-->

<template>
  <div class="assemblyBox">
    <div class="title">ASSEMBLY CODE</div>
    <prism-editor class="editor" v-model="code" :highlight="highlighter" line-numbers readonly></prism-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-nasm';
import 'prismjs/themes/prism-tomorrow.css';

export default defineComponent({
  name: 'CodeViewer',
  components: { PrismEditor },
  props: {
    assemblyCode: { type: String, required: true },
  },
  setup(props) {
    const highlighter = (codeToHighlight: string) => highlight(codeToHighlight, languages.nasm, 'nasm');

    const code = ref(props.assemblyCode);

    return {
      highlighter,
      code,
    };
  },
});

</script>

<style scoped>
.editor {
  background: var(--editorBackgroundColor);
  color: var(--editorFontColor);
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 15px;
  line-height: 1.5;
  width: 100%;
  padding: var(--paddingSize) calc(var(--paddingSize) * 0.1);
  height: 100%;
  border-radius: var(--borderRadiusSize);
}

.assemblyBox {
  background-color: var(--editorBoxBackgroundColor);
  border-radius: var(--borderRadiusSize);
  padding: calc(var(--paddingSize) * 0.5);
  height: 95%;
  box-shadow: 0 0 calc(var(--byteSize) / 0.3) calc(var(--byteSize) / 0.6) var(--shadowIntensity);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 0 0 calc(var(--byteSize) / 1.5);
  min-width: 200px;
}

.title {
  text-align: center;
  margin: 1vh 0;
  font-size: var(--fontTitleSize);
}
</style>
