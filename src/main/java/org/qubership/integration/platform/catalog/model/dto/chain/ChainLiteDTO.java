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

package org.qubership.integration.platform.catalog.model.dto.chain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

import org.qubership.integration.platform.catalog.model.dto.BaseResponse;
import org.qubership.integration.platform.catalog.model.dto.dependency.DependencyResponse;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@Schema(description = "Chain lite object for using in the chain diff API")
public class ChainLiteDTO extends BaseResponse {

    @Schema(description = "Id of the snapshot selected for comparing", defaultValue = "00000000-0000-0000-0000-000000000000")
    @Builder.Default
    private String currentSnapshotId = "00000000-0000-0000-0000-000000000000";
    @Schema(description = "Name of the snapshot selected for comparing", defaultValue = "Current")
    @Builder.Default
    private String currentSnapshotName = "Current";
    @Schema(description = "Dependencies (links) between elements of the chain")
    private List<DependencyResponse> dependencies;
}