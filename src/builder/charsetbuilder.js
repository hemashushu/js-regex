/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {
    EscapedChar,
    SimpleChar,
    MetaChar,
    UnicodeChar,
    CharSet,

    EntityChars,
    MetaChars
} from '../ast/index.js';

import { CharRangeBuilder } from './charrangebuilder.js';

class CharSetBuilder {
    constructor(parent, receiveFunc) {
        this.parent = parent;
        this.receiveFunc = receiveFunc;

        this.elements = [];
    }

    addChar(char) {
        let c;
        if (EntityChars.includes(char)) {
            c = new EscapedChar(char);
        } else {
            c = new SimpleChar(char);
        }

        this.elements.push(c);
        return this;
    }

    addMetaChar(char) {
        if (!MetaChars.includes(char)) {
            throw new Error(`Invalid meta char "${char}"`);
        }
        let c = new MetaChar(char);
        this.elements.push(c);
        return this;
    }

    addUnicodeChar(codePointInt) {
        let c = new UnicodeChar(codePointInt);
        this.elements.push(c);
        return this;
    }

    addRange() {
        return new CharRangeBuilder(this, (charRange) => {
            this.elements.push(charRange)
        });
    }

    build() {
        let charSet = new CharSet(this.elements, false);

        if (this.parent === undefined) {
            return charSet;
        } else {
            this.receiveFunc(charSet);
            return this.parent;
        }
    }
}

export { CharSetBuilder };