/*
 * Copyright 2024-2025 NetCracker Technology Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.qubership.integration.platform.catalog.mapping.exportimport.instructions;

import org.jetbrains.annotations.NotNull;
import org.qubership.integration.platform.catalog.model.exportimport.instructions.*;
import org.qubership.integration.platform.catalog.persistence.configs.entity.instructions.ImportInstruction;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class SpecificationGroupInstructionsMapper implements ImportInstructionsMapper<ImportInstructionsConfig, ImportInstructionsDTO> {

    @Override
    public List<ImportInstruction> asEntities(@NotNull GeneralImportInstructionsConfig generalImportInstructionsConfig) {
        return Collections.emptyList();
    }

    @Override
    public List<ImportInstruction> asEntitiesIncludingDeletes(@NotNull GeneralImportInstructionsConfig generalImportInstructionsConfig) {
        if (generalImportInstructionsConfig.getSpecificationGroups() == null) {
            return Collections.emptyList();
        }

        return configToEntity(
                generalImportInstructionsConfig.getSpecificationGroups().getDelete(),
                ImportEntityType.SPECIFICATION_GROUP,
                ImportInstructionAction.DELETE,
                generalImportInstructionsConfig.getLabels()
        );
    }

    @Override
    public ImportInstructionsConfig asConfig(@NotNull List<ImportInstruction> importInstructions) {
        Set<String> specificationGroupsToIgnore = importInstructions.stream()
                .filter(importInstruction -> ImportEntityType.SPECIFICATION_GROUP.equals(importInstruction.getEntityType()))
                .filter(importInstruction -> ImportInstructionAction.DELETE.equals(importInstruction.getAction()))
                .map(ImportInstruction::getId)
                .collect(Collectors.toSet());
        return ImportInstructionsConfig.builder()
                .delete(specificationGroupsToIgnore)
                .build();
    }

    @Override
    public ImportInstructionsDTO asDTO(@NotNull List<ImportInstruction> importInstructions) {
        Set<ImportInstructionDTO> specificationGroupsToIgnore = importInstructions.stream()
                .filter(importInstruction -> ImportEntityType.SPECIFICATION_GROUP.equals(importInstruction.getEntityType()))
                .filter(importInstruction -> ImportInstructionAction.DELETE.equals(importInstruction.getAction()))
                .map(this::entityToDTO)
                .collect(Collectors.toSet());
        return ImportInstructionsDTO.builder()
                .delete(specificationGroupsToIgnore)
                .build();
    }
}