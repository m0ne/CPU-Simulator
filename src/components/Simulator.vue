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
  <div>
    <div v-if="dataIsLoaded" class="SimulatorContainer">
      <CPU :current-state="currentState"/>
      <div class="MemoryContainer">
        <div class="topContainer">
          <CpuCycle
            :disable-button="disableNextButton"
            :current-step="currentStep"
            :all-steps="allSteps"
            :is-last-step="isLastStep"
            :is-initial-step="isInitialStep"
            v-on:nextStep="nextStep"
            v-on:previousStep="previousStep"
            v-on:changeStepAnimate="changeStepAnimate"
          />
          <Controls
            :change-history="currentState.changeHistory"
            v-on:changeAnimationSpeed="changeAnimationSpeed"/>
        </div>
        <Memory :state="currentState"/>
      </div>
      <CodeViewer class="code-viewer" :assembly-code="assemblyCode"/>
    </div>
    <AnimationHelper/>
  </div>
</template>

<script lang="ts">
import CPU from '@/components/cpu/Cpu.vue';
import Memory from '@/components/memory/Memory.vue';
import CpuCycle from '@/components/simulatorControls/CpuCycle.vue';
import StepController from '@/services/controller';
import Controls from '@/components/simulatorControls/Controls.vue';
import AnimationHelper from '@/components/general/AnimationHelper.vue';
import Program from '@/services/interfaces/Program';
import startEmulator from '@/services/startSimulatorService';
import CodeViewer from '@/components/CodeViewer/CodeViewer.vue';
import {
  defineComponent, reactive, Ref, ref, toRef,
} from 'vue';
import { useRouter } from 'vue-router';
import State from '@/services/interfaces/State';
import CpuCycleStep from '@/services/interfaces/CpuCycleStep';

export default defineComponent({
  name: 'Simulator',
  components: {
    CodeViewer,
    AnimationHelper,
    CpuCycle,
    Memory,
    CPU,
    Controls,
  },
  props: {
    machineCodeFromURLSimulator: { type: String, required: true },
    base64AssemblyFromURLSimulator: { type: String, required: true },
  },
  setup(props) {
    const router = useRouter();

    const assemblyCode = ref(atob(props.base64AssemblyFromURLSimulator));

    const dataIsLoaded = ref(false);

    const isLastStep = ref(false);

    const isInitialStep = ref(true);

    const disableNextButton = ref(false);

    const currentStep: Partial<CpuCycleStep> = reactive({});

    const allSteps: Partial<Array<CpuCycleStep>> = reactive([]);

    const currentState: Partial<State> = reactive({});

    let program: Program;
    let stepController: StepController;

    async function synchronize() {
      Object.assign(currentState, stepController.getState());
      Object.assign(currentStep, stepController.getCurrentStep());
      Object.assign(allSteps, stepController.getAllSteps());
      console.log('synchronizeState', 'pointerBytes', currentState.byteInformation?.instructionPointerInformation?.pointerBytes, 'address', currentState.byteInformation?.instructionPointerInformation?.pointerAddress);
    }

    const initialization = async () => {
      dataIsLoaded.value = false;
      try {
        program = await startEmulator(props.machineCodeFromURLSimulator);
        program.vm = this;

        stepController = new StepController(program);

        isLastStep.value = false;
        isInitialStep.value = true;
        await synchronize();
      } catch {
        await router.push('/fail');
      }
      dataIsLoaded.value = true;
    };

    const nextStep = async () => {
      if (isLastStep.value) {
        window.location.reload();
      } else if (stepController) {
        disableNextButton.value = true;
        await stepController.nextStep()
          .then((isNotLastStep: boolean) => {
            if (!isNotLastStep) {
              isLastStep.value = true;
            }
            disableNextButton.value = false;
            isInitialStep.value = false;
          });
        await synchronize();
      }
    };

    const previousStep = async () => {
      if (stepController && !isInitialStep.value) {
        isLastStep.value = false;
        await stepController.previousStep();
        if (stepController.isInitialStep()) {
          isInitialStep.value = true;
        }
        program = stepController.getProgram();
        program.vm = this;
        await synchronize();
      }
    };

    const closeEmulator = () => {
      if (program) {
        program.ucInstance.close();
        program.disassemblerInstance.delete();
      }
    };

    const terminate = () => {
      isLastStep.value = true;
      closeEmulator();
    };

    const codeAsNumberArray = (): Array<number> => {
      const stringArray = props.machineCodeFromURLSimulator.split(',');
      return stringArray.map((value) => parseInt(value, 16));
    };

    const changeStepAnimate = (currentStep: number) => {
      if (stepController) {
        stepController.changeStepAnimate(currentStep);
      }
    };

    const changeAnimationSpeed = (speed: number) => {
      if (stepController) {
        stepController.changeAnimationSpeed(speed);
      }
    };

    initialization();

    return {
      changeAnimationSpeed,
      changeStepAnimate,
      codeAsNumberArray,
      terminate,
      closeEmulator,
      nextStep,
      previousStep,
      dataIsLoaded,
      assemblyCode,
      isInitialStep,
      isLastStep,
      disableNextButton,
      currentState,
      currentStep,
      allSteps,
    };
  },
});

</script>

<style scoped>
.SimulatorContainer {
  align-content: center;
  align-items: center;
  height: 98vh;
  width: 98vw;
  margin: auto;
  justify-content: space-evenly;
}

.MemoryContainer {
  flex-direction: column;
  align-content: space-around;
  height: 95%;
  justify-content: space-between;
}

.MemoryContainer, .SimulatorContainer {
  display: flex;
}

.topContainer {
  display: flex;
}

@media screen
and (max-width: 1150px) {
  .code-viewer {
    display: none;
  }
}
</style>
