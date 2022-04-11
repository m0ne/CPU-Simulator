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
  <div class="cpu-cycle-steps">
      <div class="cpuCycleTitle">CPU CYCLE</div>
    <div class="controlsContainer">
      <PreviousStepButton :disable-button="disableButton" class="step-button-container" :is-initial-step="isInitialStep" v-on:previousStep="previousStep()"></PreviousStepButton>
      <NextStepButton :disable-button="disableButton" class="step-button-container" :is-last-step="isLastStep" v-on:nextStep="nextStep()"></NextStepButton>
    </div>
    <div class="steps-container" v-for="step in allSteps" :key="step.numberInCycleSequence">
      <Step :step="step" :current-step="calculateSpecialStep()" :is-last-step="isLastStep" :is-initial-step="isInitialStep" v-on:changeStepAnimate="changeStepAnimate"></Step>
    </div>
  </div>
</template>

<script lang="ts">
import PreviousStepButton from '@/components/simulatorControls/PreviousStepButton.vue';
import StepVue from '@/components/simulatorControls/Step.vue';
import CpuCycleStep from '@/services/interfaces/CpuCycleStep';
import NextStepButton from '@/components/simulatorControls/NextStepButton.vue';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'CpuCycle',
  components: {
    NextStepButton,
    Step: StepVue,
    PreviousStepButton,
  },
  emits: ['changeStepAnimate', 'nextStep', 'previousStep'],
  props: {
    currentStep: { type: Object as PropType<CpuCycleStep>, required: true },
    allSteps: { type: Object as PropType<Array<CpuCycleStep>>, required: true },
    isLastStep: Boolean,
    isInitialStep: Boolean,
    disableButton: Boolean,
  },
  setup(props, { emit }) {
    const isBackStep = ref(false);

    const calculateSpecialStep = () => {
      if (isBackStep.value && props.isInitialStep) {
        const nr = props.currentStep.numberInCycleSequence - 1;

        if (nr < 0) {
          const { length } = props.allSteps;
          return props.allSteps[length - 1];
        }
        return props.allSteps[nr];
      }
      return props.currentStep;
    };

    const nextStep = () => {
      isBackStep.value = false;
      emit('nextStep');
    };

    const previousStep = () => {
      isBackStep.value = true;
      emit('previousStep');
    };

    const changeStepAnimate = (currentStep: number) => {
      emit('changeStepAnimate', currentStep);
    };

    return {
      isBackStep,
      nextStep,
      previousStep,
      changeStepAnimate,
      calculateSpecialStep,
    };
  },
});
</script>

<style scoped>
  .controlsContainer {
    display: flex;
    justify-content: space-between;
    padding-right: var(--paddingSize);
    /*padding-top: var(--paddingSize);*/
  }

  .steps-container {
    display: block;
  }

  .cpu-cycle-steps, .step-button-container, .cpuCycleTitle {
    display: inline-block
  }

  .cpu-cycle-steps {
    border-radius: var(--borderRadiusSize);
    padding: 0 0 calc(var(--paddingSize) * 0.5) var(--paddingSize);
    border: solid 2px var(--cpuCycleBoxBorderColor);
  }

  .cpuCycleTitle {
    margin-top: var(--paddingSize);
    margin-bottom: var(--paddingSize);
    font-size: var(--fontTitleSize);
    line-height: 0;
    text-align: center;
    width: 100%;
  }
</style>
