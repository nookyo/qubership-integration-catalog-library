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

package org.qubership.integration.platform.catalog.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpecificationImportException extends CatalogRuntimeException {

    private String originalExceptionStackTrace;

    public SpecificationImportException(String errorMessage) {
        super(errorMessage);
    }

    public SpecificationImportException(String message, Throwable cause) {
        super(message, cause);
    }

    public SpecificationImportException(String message, Exception originalException) {
        super(message, originalException);
    }

    public SpecificationImportException(String message, String originalExceptionStacktrace) {
        super(message);
        this.originalExceptionStackTrace = originalExceptionStacktrace;
    }
}
