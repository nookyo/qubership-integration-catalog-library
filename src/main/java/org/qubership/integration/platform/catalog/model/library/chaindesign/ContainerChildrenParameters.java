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

package org.qubership.integration.platform.catalog.model.library.chaindesign;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
@Schema(description = "Container children parameters object")
public class ContainerChildrenParameters {

    @Schema(description = "Name")
    private String name;

    /**
     * Operator for first element entry
     */
    @Schema(description = "Operator for first element entry")
    private ElementDiagramOperation primaryOperation;

    /**
     * Other operations, optional parameter. If null - will be used primaryOperation for all element
     */
    @Nullable
    @Schema(description = "Other operations, optional parameter. If null - will be used primaryOperation for all elements")
    private ElementDiagramOperation secondaryOperation;
}