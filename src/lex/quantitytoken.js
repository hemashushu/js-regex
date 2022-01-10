/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Token } from './token.js';

class QuantityToken extends Token {
    constructor(type, greedy = true, from, to) {
        super();
        this.type = type; // ?,+,*,{m,n},{m,},{m}
        this.greedy = greedy;
        this.from = from;
        this.to = to;
    }
}

export { QuantityToken };