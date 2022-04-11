<template>
  <div
    :id=byte.locationId
    class='shadowAndBorder'
    :class="{
      'instructionPointer': isInstructionPointer(),
      'unusedByteShadowAndBorder': !isUsedByte(),
    }">
    <div
      v-if="byte && byte.content"
      class='byteElement'
      :class="{
      'unusedByte': !isUsedByte(),
      'instructionByte': isUsedByte() && isInstructionByte(),
      'stackByte': isUsedByte() && isStackByte(),
      'baseByte': isUsedByte() && isBaseByte() && !isStackByte(),
    }">
      {{ byte.content }}
    </div>
    <div v-if="isStackPointer()"
      :class="{'stackPointer': isStackPointer(),}
    ">
    </div>
    <div v-if="isBasePointer()"
       :class="{'basePointer': isBasePointer(),}
    ">
    </div>
    <div v-if="isStackPointer()"
       class='stackPointerText'>STACK POINTER
    </div>
    <div v-if="isInstructionPointer()"
       class='instructionPointerText'>INSTRUCTION POINTER
    </div>
    <div v-if="isBasePointer()"
       class='basePointerText'>BASE POINTER
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, watch,
} from 'vue';
import Byte from '@/services/interfaces/Byte';
import ByteInformation, {
  CodeInformation,
  PointerInformation,
} from '@/services/interfaces/ByteInformation';

export default defineComponent({
  name: 'ByteVue',
  components: {},
  props: {
    byte: { type: Object as PropType<Byte>, required: true },
    byteInformation: Object as PropType<ByteInformation>,
  },
  setup(props) {
    const localID = () => parseInt(props.byte.locationId, 16);

    const compareLocalID = (other: number) => localID() === other;

    const containsLocalID = (strings: Array<number>): boolean => (strings.findIndex(compareLocalID) >= 0);

    const isInRange = (code: CodeInformation): boolean => (localID() >= code.from && localID() < code.to);

    const isUsedByte = (): boolean => {
      if (props.byteInformation?.code && isInRange(props.byteInformation.code)) {
        return true;
      }
      if (props.byteInformation?.usedBytes) {
        return containsLocalID(props.byteInformation.usedBytes);
      }
      return true;
    };

    const instructionInfo = () => props.byteInformation?.instructionPointerInformation;

    const stackInfo = () => props.byteInformation?.stackPointerInformation;

    const baseInfo = () => props.byteInformation?.basePointerInformation;

    const isPointer = (pointerInfo?: PointerInformation) => (pointerInfo ? compareLocalID(pointerInfo.pointerAddress) : false);

    const isInstructionPointer = () => isPointer(instructionInfo());

    const isStackPointer = () => isPointer(stackInfo());

    const isBasePointer = () => isPointer(baseInfo());

    const isPointerByte = (pointerInfo?: PointerInformation) => (pointerInfo ? containsLocalID(pointerInfo.pointerBytes) : false);

    const isInstructionByte = () => isPointerByte(instructionInfo());

    const isStackByte = () => isPointerByte(stackInfo());

    const isBaseByte = () => isPointerByte(baseInfo());

    watch(props, () => {
      if (props.byteInformation) {
        console.log('props updated :)');
      }
    });

    return {
      isInstructionPointer,
      isInstructionByte,
      isStackPointer,
      isStackByte,
      isBasePointer,
      isBaseByte,
      isUsedByte,
    };
  },
});
</script>

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

<style scoped>
.byteElement {
  --margin-ratio: 16;
  border-radius: var(--size);
  background-color: var(--byteBackgroundColor);
  color: var(--byteFontColor);
  display: inline-table;
  font-family: "Roboto Mono", "Fira code", "Fira Mono", Consolas, Menlo, Courier, monospace;
  font-size: var(--size);
  line-height: 1;
  width: calc(var(--size) * 1.5);
  text-align: center;
  padding-bottom: calc(var(--size) / 16);
  z-index: 1;
}

.shadowAndBorder {
  --margin-ratio: 8;
  display: inline-block;
  margin: calc(var(--size) / var(--margin-ratio));
  border-radius: 1000px;
  line-height: 0;
  box-shadow: 0 0 calc(var(--size) / 3) calc(var(--size) / 10) var(--shadowIntensity);
}

.shadowAndBorder, .byteElement {
  --size: var(--byteSize);
  position: relative;
}

.unusedByte {
  background-color: var(--unusedByteBackgroundColor);
  color: var(--unusedByteFontColor);
}

.unusedByteShadowAndBorder {
  box-shadow: none;
}

.instructionByte {
  background-color: var(--instructionByteBackgroundColor);
}

.baseByte {
  background-color: var(--baseByteBackgroundColor);
}

.stackByte {
  background-color: var(--stackByteBackgroundColor);
}

.basePointer, .stackPointer {
  width: 0;
  height: 0;
  border-left: calc(var(--byteSize) * 0.4375) solid transparent;
  border-right: calc(var(--byteSize) * 0.4375) solid transparent;
  position: absolute;
  left: calc(var(--byteSize) * 0.3125);
  z-index: 2;
}

.basePointer {
  animation: basePointerAnimation 1s;
  border-bottom: calc(var(--byteSize) * 0.4375) solid var(--basePointerColor);
  bottom: calc(var(--byteSize) * -0.125);
}

.stackPointer {
  animation: stackPointerAnimation 1s;
  border-top: calc(var(--byteSize) * 0.4375) solid var(--stackPointerColor);
  top: calc(var(--byteSize) * -0.125);
}

/* Make sure no animation is triggered during cloning */
/* This class is added dynamically in the services. Look at htmlClass in htmlIds.ts */
.CopyNode > .basePointer, .CopyNode > .stackPointer {
  animation: none;
}

.shadowAndBorder:hover > .stackPointer {
  transform: rotate(270deg) translate(calc(var(--byteSize) * -0.4375), calc(var(--byteSize) * -0.75));
}

@keyframes stackPointerAnimation {
  0% {
    transform: scale(0.5, 0.5);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityStackPointer);
  }
  50% {
    transform: scale(3, 3);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityStackPointerTransparent);
  }
  100% {
    transform: scale(1, 1);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityStackPointerTransparent);
  }
}

@keyframes basePointerAnimation {
  0% {
    transform: scale(0.5, 0.5);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityBasePointer);
  }
  50% {
    transform: scale(3, 3);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityBasePointerTransparent);

  }
  100% {
    transform: scale(1, 1);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityBasePointerTransparent);
  }
}

.stackPointerText, .basePointerText, .instructionPointerText {
  display: none;
}

.shadowAndBorder:hover > .stackPointerText,
.shadowAndBorder:hover > .basePointerText,
.shadowAndBorder:hover > .instructionPointerText {
  line-height: initial;
  font-size: var(--fontNormalSize);
  display: inline;
  width: calc(var(--byteSize) * 4);
  height: calc(var(--byteSize) * 2.5);
  position: absolute;
  text-align: center;
  border-radius: calc(var(--byteSize) * 0.375);
  z-index: 158000;
}

.shadowAndBorder:hover > .stackPointerText {
  bottom: calc(var(--byteSize) * -1);
  left: calc(var(--byteSize) * -4.125);
  color: var(--stackPointerTextFontColor);
  background-color: var(--stackPointerTextBackgroundColor);
  animation: stackPointerTextAnimation 0.2s;
}

@keyframes stackPointerTextAnimation {
  0% {
    left: calc(var(--byteSize) * -1.25);
    transform: scale(0.5, 0.5);
  }
  50% {
    left: calc(var(--byteSize) * -1.25);
    transform: scale(1, 1);
  }
  100% {
  }
}

.shadowAndBorder:hover > .basePointerText {
  bottom: calc(var(--byteSize) * -2.5);
  left: calc(var(--byteSize) * -1.25);
  color: var(--basePointerTextFontColor);
  background-color: var(--basePointerTextBackgroundColor);
  animation: basePointerTextAnimation 0.4s;
}

@keyframes basePointerTextAnimation {
  0% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(0.5, 0.5);
  }
  50% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(1, 1);
  }
  100% {
  }
}

.instructionPointer {
  --borderWidth: calc(var(--byteSize) * 0.125);
  margin: calc(calc(var(--size) / var(--margin-ratio)) - var(--borderWidth));
  border: solid var(--borderWidth) var(--instructionPointerByteBorderColor);
}

.shadowAndBorder:hover > .instructionPointerText {
  line-height: initial;
  width: calc(var(--byteSize) * 6.4);
  height: calc(var(--byteSize) * 2.5);
  bottom: calc(var(--byteSize) * -2.5);
  left: calc(var(--byteSize) * -4.5);
  border: solid var(--instructionPointerTextBorderColor) calc(var(--byteSize) * 0.125);
  background-color: var(--instructionPointerTextBackgroundColor);
  color: var(--baseFontColor);
  animation: instructionPointerTextAnimation 0.4s;
}

@keyframes instructionPointerTextAnimation {
  0% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(0.5, 0.5);
  }
  50% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(1, 1);
  }
  100% {
  }
}
</style>
