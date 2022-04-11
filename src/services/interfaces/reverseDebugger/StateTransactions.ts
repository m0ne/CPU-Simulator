/* SPDX-License-Identifier: GPL-2.0-only */
/*
 * GCSx64 - x86_64 Graphical CPU Simulator
 *
 * Copyright © 2021 by Michael Schneider <michael.schneider@hispeed.com> and Tobias Petter <tobiaspetter@chello.at>
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

import MemoryData from '@/services/interfaces/MemoryData';
import Register from '@/services/interfaces/Register';
import Instruction from '@/services/interfaces/Instruction';
import InstructionPointer from '@/services/interfaces/InstructionPointer';
import Flag from '@/services/interfaces/Flag';
import AccessedElements from '@/services/interfaces/AccessedElements';
import ByteInformation from '@/services/interfaces/ByteInformation';
import { ChangeHistory } from '@/services/interfaces/State';
import Version from '@/services/interfaces/reverseDebugger/Version';

interface StateTransactions {
  memoryData: [{version: Version; value: MemoryData}];
  registers: [{version: Version; value: Array<Register>}];
  currentInstruction: [{version: Version; value: Instruction}];
  instructionPointer: [{version: Version; value: InstructionPointer}];
  flags: [{version: Version; value: Array<Flag>}];
  currentAccessedElements: [{version: Version; value: AccessedElements}];
  byteInformation: [{version: Version; value: ByteInformation}];
  changeHistory: [{version: Version; value: Array<ChangeHistory>}];
}

export default StateTransactions;
