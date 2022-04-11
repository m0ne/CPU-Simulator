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
  <div class="button-container">
    <q-btn class="execution-button" :disable="disableButton" v-if="isLastStep" color="secondary" text-color="buttonFontColor" label="Restart" @click="nextStep()">
      <q-icon class="bootstrap-icon" name="bi-arrow-counterclockwise"/>
    </q-btn>
    <q-btn class="execution-button" :disable="disableButton" v-else color="secondary" text-color="buttonFontColor" label="Next Step" @click="nextStep()">
      <svg class="redoIcon" width="280" height="113" viewBox="0 0 280 113" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Layer 1</title>
          <path id="svg_8" d="m19.50001,103.44918c12.00459,-65.82574 145.0833,-134.66418 225,-26.94919" opacity="NaN" stroke-width="33" fill="none"/>
          <path transform="rotate(-89.7034 245.657 76.5075)" id="svg_9" d="m230.136,92.48688l0,-31.95877l31.043,31.95877l-31.043,0z" stroke-width="33" fill="none"/>
        </g>
      </svg>
    </q-btn>
    <q-tooltip style="font-size: 16px" anchor="bottom middle" self="top middle">
      <span v-if="isLastStep">Restart your program</span>
      <span v-else>Execute next step</span>
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NextStepButton',
  components: {},
  props: {
    isLastStep: Boolean,
    disableButton: Boolean,
  },
  setup(props, context) {
    const nextStep = () => {
      context.emit('nextStep');
    };

    return {
      nextStep,
    };
  },
});

</script>

<style scoped>
.button-container {
  display: inline;
}
.bootstrap-icon {
  font-family: bootstrap-icons;
  padding-left: 10px;
}
.execution-button {
  width: var(--buttonWidth);
  margin: 0 10px;
}
.redoIcon {
  height: calc(var(--byteSize) * 0.5);
  width: calc(var(--byteSize) * 2);
  overflow: visible;
  display: initial;
  --translateX: calc(var(--byteSize) * -0);
  --translateY: calc(var(--byteSize) * -0);
  transform: scale(1) translate(var(--translateX), var(--translateY));
}
path {
  stroke: var(--buttonFontColor);
}
</style>
