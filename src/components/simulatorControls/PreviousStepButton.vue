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
    <q-btn class="execution-button" :class="isInitialStep ? 'initial-step' : 'regular-step'" :disable="disableButton" text-color="buttonFontColor" @click="previousStep">
      <svg class="redoIcon" :class="isInitialStep? 'initial-step-path' : 'regular-step-path'" width="280" height="113" viewBox="0 0 280 113" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(-1,1)">
          <title>Layer 1</title>
            <path id="svg_8" d="m19.50001,103.44918c12.00459,-65.82574 145.0833,-134.66418 225,-26.94919" opacity="NaN" stroke-width="33" fill="none"/>
            <path transform="rotate(-89.7034 245.657 76.5075)" id="svg_9" d="m230.136,92.48688l0,-31.95877l31.043,31.95877l-31.043,0z" stroke-width="33" fill="none"/>
        </g>
      </svg>
      <span>Step back</span>
    </q-btn>
    <q-tooltip style="font-size: 16px" anchor="bottom middle" self="top middle">
      <span>Go back to last step</span>
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PreviousStepButton',
  components: {},
  props: {
    isInitialStep: Boolean,
    disableButton: Boolean,
  },
  setup(props, context) {
    const previousStep = () => {
      context.emit('previousStep');
    };

    return {
      previousStep,
      ...props,
    };
  },
});

</script>

<style scoped>
.initial-step {
  background: var(--pastStepBackgroundColor);
  color: var(--pastStepFontColor);
}

.regular-step {
  background: var(--quasarPrimary);
}

.button-container {
  display: inline;
}
.execution-button {
  width: var(--buttonWidth);
}
.redoIcon {
  height: calc(var(--byteSize) * 0.5);
  width: calc(var(--byteSize) * 2);
  overflow: visible;
  display: initial;
  --translateX: calc(var(--byteSize) * 0.9);
  --translateY: calc(var(--byteSize) * -0);
  transform: scale(1) translate(var(--translateX), var(--translateY));
}
.regular-step-path path {
  stroke: var(--buttonFontColor);
}

.initial-step-path path {
  stroke: var(--pastStepFontColor);
}
</style>
