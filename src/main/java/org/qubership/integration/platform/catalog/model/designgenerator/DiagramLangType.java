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

package org.qubership.integration.platform.catalog.model.designgenerator;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.function.Function;

import org.qubership.integration.platform.catalog.util.DiagramBuilderEscapeUtil;

@Getter
@Schema(description = "Sequence diagram language")
public enum DiagramLangType {
    PLANT_UML(" \n", DiagramBuilderEscapeUtil::escapePlantUMLArg),
    MERMAID("; \n", DiagramBuilderEscapeUtil::escapeMermaidArg);

    private final String lineTerminator;
    private final Function<String, String> argCleaner;


    DiagramLangType(String lineTerminator, Function<String, String> argCleaner) {
        this.lineTerminator = lineTerminator;
        this.argCleaner = argCleaner;
    }

    public String escapeArgument(String argument) {
        return argCleaner.apply(argument);
    }
}