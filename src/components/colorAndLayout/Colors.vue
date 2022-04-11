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
  <div></div>
</template>

<script>

export default {
  name: 'Colors',
};
</script>

<style>
:root.light {
  /* Main colors */
  --primaryColor: #cee5d0; /* background color of all primary elements */
  --elementColor: #f3f0d7; /* background color of secondary elements contained within primary elements */
  --quasarSecondary: #fed2aa; /* color of Quasar GUI elements (toggles, buttons, sliders) a6d0e4*/
  --backgroundColor: #d9d9d9; /* main background color */
  --baseFontColor: black;
  --byteFontColor: black;
  --buttonFontColor: black;

  /* Memory */
  --memoryAddressColor: var(--elementColor);
  --memoryBlockColor: var(--primaryColor);
  --memoryByteHeaderColor: var(--elementColor);

  /* CPU */
  --cpuBlockColor: var(--primaryColor);
  --currentInstructionBlockColor: var(--elementColor);
  --currentInstructionAssemblyBlockColor: var(--registerColor);
  --executionBoxColor:  var(--elementColor);
  --executionBoxByteZoneColor: var(--registerColor);
  --instructionPointerBlockColor: var(--elementColor);
  --registerBlockColor: var(--elementColor);
  --registerColor: #d6d2d2;
  --byteCPUColor: var(--registerColor);

  /* Attention animation color */
  --attentionPulseColor: var(--backgroundColor);

  /* CPU Cycle Box */
  --cpuCycleBoxBorderColor: #ccc;
  --stepAvatarBackgroundColor: floralwhite;
  --pastStepFontColor: #949494;
  --currentFutureStepFontColor: var(--buttonFontColor);
  --currentStepBackgroundColor: #aa6e03;
  --pastStepBackgroundColor: #b0b0b0;
  --stepBackgroundColor: var(--quasarSecondary);

  /* Editor */
  --editorBackgroundColor: #2d2d2d; /* color of the field inside code viewer*/
  --editorFontColor: #ccc; /* is different from primary color to give editor an 'unchangeable' look*/
  --editorBoxBackgroundColor: var(--primaryColor);
  --editorErrorBoxColor: #b32727;
  --editorErrorBoxFontColor: #FFFFFF;
  --licenseButtonColor: var(--primaryColor);

  /* Byte color */
  --byteBackgroundColor: white;
  --unusedByteBackgroundColor: #9c9c9c;
  --unusedByteFontColor: #00000066;
  --instructionByteBackgroundColor: lightgoldenrodyellow;
  --baseByteBackgroundColor: lightblue;
  --stackByteBackgroundColor: #F9BDA5;
  --basePointerColor: #0004ff;
  --stackPointerColor: #931953;
  --stackPointerTextFontColor: white;
  --basePointerTextFontColor: white;
  --stackPointerTextBackgroundColor: #931953;
  --basePointerTextBackgroundColor: #0004ff;
  --instructionPointerTextBackgroundColor: #fafad2;
  --instructionPointerTextBorderColor: #0e00f2;
  --instructionPointerByteBorderColor: #1000ff;

  /* Quasar related colors like buttons */
  --quasarPrimary: var(--quasarSecondary);
  --quasarAccent: var(--quasarSecondary);
  --quasarDark: #1D1D1D;
  --quasarPositive: #21BA45;
  --quasarNegative: #C10015;
  --quasarInfo: #31CCEC;
  --quasarWarning: #F2C037;
}

:root.light {
  color: var(--baseFontColor);
}

:root.dark {
  /* Main colors */
  --primaryColor: #000000; /* background color of all primary elements */
  --elementColor: #840808; /* background color of secondary elements contained within primary elements */
  --quasarSecondary: var(--editorBackgroundColor); /* color of Quasar GUI elements (toggles, buttons, sliders) */
  --backgroundColor: #727272; /* main background color */
  --baseFontColor: white;
  --byteFontColor: black;
  --buttonFontColor: white;

  /* Memory */
  --memoryAddressColor: var(--elementColor);
  --memoryBlockColor: var(--primaryColor);
  --memoryByteHeaderColor: var(--elementColor);

  /* CPU */
  --cpuBlockColor: var(--primaryColor);
  --currentInstructionBlockColor: var(--elementColor);
  --currentInstructionAssemblyBlockColor: var(--unusedByteBackgroundColor);
  --executionBoxColor:  var(--elementColor);
  --executionBoxByteZoneColor: var(--unusedByteBackgroundColor);
  --instructionPointerBlockColor: var(--elementColor);
  --registerBlockColor: var(--elementColor);
  --registerColor: var(--unusedByteBackgroundColor);
  --byteCPUColor: var(--unusedByteBackgroundColor);

  /* Attention animation color */
  --attentionPulseColor: var(--backgroundColor);

  /* CPU Cycle Box */
  --cpuCycleBoxBorderColor: #ccc;
  --stepAvatarBackgroundColor: floralwhite;
  --pastStepFontColor: #949494;
  --currentFutureStepFontColor: white;
  --currentStepBackgroundColor: var(--quasarSecondary);
  --pastStepBackgroundColor: #6c6c6c;
  --stepBackgroundColor: #5a5959;

  /* Editor */
  --editorBackgroundColor: #2d2d2d; /* color of the field inside code viewer*/
  --editorFontColor: #ccc; /* is different from primary color to give editor an 'unchangeable' look*/
  --editorBoxBackgroundColor: var(--primaryColor);
  --editorErrorBoxColor: #b32727;
  --editorErrorBoxFontColor: #FFFFFF;
  --licenseButtonColor: var(--primaryColor);

  /* Byte color */
  --byteBackgroundColor: white;
  --unusedByteBackgroundColor: #7a7a7a;
  --unusedByteFontColor: #00000033;
  --instructionByteBackgroundColor: lightgoldenrodyellow;
  --baseByteBackgroundColor: lightblue;
  --stackByteBackgroundColor: #F9BDA5;
  --basePointerColor: #0004ff;
  --stackPointerColor: #931953;
  --stackPointerTextFontColor: white;
  --basePointerTextFontColor: white;
  --stackPointerTextBackgroundColor: #931953;
  --basePointerTextBackgroundColor: #0004ff;
  --instructionPointerTextBackgroundColor: #fafad2;
  --instructionPointerTextBorderColor: #0e00f2;
  --instructionPointerByteBorderColor: #1000ff;

  /* Quasar related colors like buttons */
  --quasarPrimary: var(--quasarSecondary);
  --quasarAccent: var(--quasarSecondary);
  --quasarDark: #1D1D1D;
  --quasarPositive: #21BA45;
  --quasarNegative: #C10015;
  --quasarInfo: #31CCEC;
  --quasarWarning: #F2C037;
}
:root.dark {
  color: var(--baseFontColor);
}

:root.legacy{
  /* Main font color */
  --baseFontColor: #000;

  /* Memory */
  --byteCPUColor:  #ffff64;
  --memoryBlockColor:  #f9c9d0;
  --memoryByteHeaderColor: var(--byteCPUColor);

  /* CPU */
  --cpuBlockColor: #ccebf5;
  --currentInstructionBlockColor: #5cafff;
  --currentInstructionAssemblyBlockColor: #ffffff;
  --executionBoxColor:  #7fcc62;
  --executionBoxByteZoneColor: #0000001c;
  --instructionPointerBlockColor: #ffffc6;
  --registerBlockColor: #ff6161;;
  --registerColor: #ffffff7a;

  /* Main background color */
  --backgroundColor: #e9e9e9;

  /* Attention animation color */
  --attentionPulseColor: #ccaa2c;

  /* CPU Cycle Box */
  --cpuCycleBoxBorderColor: #ccc;
  --currentStepBackgroundColor: orange;
  --pastStepFontColor: grey;
  --currentStepFontColor: var(--baseFontColor);
  --stepAvatarBackgroundColor: floralwhite;
  --currentFutureStepFontColor: black;
  --pastStepBackgroundColor: #b0b0b0;
  --stepBackgroundColor: #e0e0e0;

  /* Editor */
  --editorBackgroundColor: #2d2d2d;
  --editorFontColor: #ccc;
  --editorBoxBackgroundColor: #d0d6ff;
  --editorErrorBoxColor: #b32727;
  --editorErrorBoxFontColor: #FFFFFF;
  --licenseButtonColor: #808080;

  /* Byte color */
  --byteBackgroundColor: white;
  --unusedByteBackgroundColor: #ffffff7a;
  --unusedByteFontColor: #00000033;
  --instructionByteBackgroundColor: lightgoldenrodyellow;
  --baseByteBackgroundColor: lightblue;
  --stackByteBackgroundColor: #F9BDA5;
  --basePointerColor: #0004ff;
  --stackPointerColor: #931953;
  --stackPointerTextFontColor: white;
  --basePointerTextFontColor: white;
  --stackPointerTextBackgroundColor: #931953;
  --basePointerTextBackgroundColor: #0004ff;
  --instructionPointerTextBackgroundColor: #fafad2;
  --instructionPointerTextBorderColor: #0e00f2;
  --instructionPointerByteBorderColor: #1000ff;

  /* Quasar related colors like buttons */
  --quasarPrimary: var(--quasarSecondary);
  --quasarSecondary: #26A69A;
  --quasarAccent: var(--quasarSecondary);
  --quasarDark: #1D1D1D;
  --quasarPositive: #21BA45;
  --quasarNegative: #C10015;
  --quasarInfo: #31CCEC;
  --quasarWarning: #F2C037;
  --buttonFontColor: black;
}
:root.legacy {
  color: var(--baseFontColor);
}
</style>
