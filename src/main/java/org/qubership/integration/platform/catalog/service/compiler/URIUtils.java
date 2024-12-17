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

package org.qubership.integration.platform.catalog.service.compiler;

import javax.tools.JavaFileObject;
import java.net.URI;
import java.net.URISyntaxException;

public class URIUtils {
    public static URI buildURI(String scheme, String className, JavaFileObject.Kind kind) {
        try {
            String path = "/" + className.replace('.', '/') + kind.extension;
            return new URI(scheme, null, path, null);
        } catch (URISyntaxException exception) {
            throw new RuntimeException(exception);
        }
    }

    private URIUtils() {}
}
