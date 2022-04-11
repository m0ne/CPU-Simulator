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
<div class="memory">
  <h4 class="memoryTitle">MEMORY</h4>
  <MemoryAreaHeader/>
  <MemoryAreaData :memory-data="state.memoryData" :byte-information="state.byteInformation"/>
</div>
</template>

<script lang="ts">
import MemoryAreaData from '@/components/memory/MemoryAreaData.vue';
import MemoryAreaHeader from '@/components/memory/MemoryAreaHeader.vue';
import { PropType } from 'vue';
import State from '@/services/interfaces/State';

export default {
  name: 'Memory',
  components: {
    MemoryAreaData,
    MemoryAreaHeader,
  },
  props: {
    state: { type: Object as PropType<State>, required: true },
  },
};
</script>

<style scoped>
.memory {
  background-color: var(--memoryBlockColor);
  display: inline-block;
  border-radius: calc(var(--borderRadiusSize) * 1);
  padding: var(--paddingSize) 0;
  max-width: max-content;
  min-height: calc(var(--byteSize) * 10.375);
  /*max-height: calc(var(--byteSize) * 27.5);*/
  box-shadow: 0 0 calc(var(--byteSize) / 0.375) calc(var(--byteSize) / 1.625) var(--shadowIntensity);
  text-align: center;
  margin-top: calc(var(--paddingSize) * 0.8);
}

.memoryTitle {
  margin: var(--paddingSize);
  font-size: var(--fontTitleSize);
  display: inline-block;
  line-height: 0;
}
</style>
