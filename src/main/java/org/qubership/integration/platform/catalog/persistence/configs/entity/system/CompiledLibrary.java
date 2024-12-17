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

package org.qubership.integration.platform.catalog.persistence.configs.entity.system;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;

import org.qubership.integration.platform.catalog.configuration.auditing.CompiledLibraryEventListener;

import jakarta.persistence.*;

import java.sql.Types;

@Getter
@Setter
@Entity
@SuperBuilder
@NoArgsConstructor
@Table(name = "compiled_libraries")
@EntityListeners(CompiledLibraryEventListener.class)
public class CompiledLibrary extends AbstractSystemEntity {
    @Lob
    @JdbcTypeCode(Types.VARBINARY)
    @Basic(fetch = FetchType.LAZY)
    private byte[] data;
}
