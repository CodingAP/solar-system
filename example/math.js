Math.TWO_PI = Math.PI * 2;
Math.HALF_PI = Math.PI / 2;
Math.QUARTER_PI = Math.PI / 4;
Math.toDegrees = radians => {
    return radians * (180 / Math.PI);
}
Math.toRadians = degrees => {
    return degrees * (Math.PI / 180);
}
Math.lerp = (start, end, percentage) => {
    return percentage * (end - start) + start;
}
Math.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
Math.randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
}
Math.map = (value, start1, stop1, start2, stop2) => {
    return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
Math.distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
Math.clamp = (value, min, max) => {
    return Math.min(Math.max(min, value), max);
}

class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    set(x, y) {
        if (typeof x == 'number') {
            if (y != undefined) {
                this.x = x;
                this.y = y;
            } else {
                this.x = x;
                this.y = x;
            }
        } else {
            this.x = x.x;
            this.y = x.y;
        }
        return this;
    }


    add(x, y) {
        if (typeof v == 'number') {
            if (y != undefined) {
                this.x += x;
                this.y += y;
            } else {
                this.x += x;
                this.y += x;
            }
        } else {
            this.x += x.x;
            this.y += x.y;
        }
        return this;
    }

    subtract(x, y) {
        if (typeof x == 'number') {
            if (y != undefined) {
                this.x -= x;
                this.y -= y;
            } else {
                this.x -= x;
                this.y -= x;
            }
        } else {
            this.x -= x.x;
            this.y -= x.y;
        }
        return this;
    }

    multiply(x, y) {
        if (typeof x == 'number') {
            if (y != undefined) {
                this.x *= x;
                this.y *= y;
            } else {
                this.x *= x;
                this.y *= x;
            }
        } else {
            this.x *= x.x;
            this.y *= x.y;
        }
        return this;
    }

    divide(x, y) {
        if (typeof x == 'number') {
            if (y != undefined) {
                this.x /= x;
                this.y /= y;
            } else {
                this.x /= x;
                this.y /= x;
            }
        } else {
            this.x /= x.x;
            this.y /= x.y;
        }
        return this;
    }

    normalize() {
        let mag = this.getMagnitude();
        if (mag != 0) this.divide(mag)
        return this;
    }

    dot(v) {
        let dotProduct = this.x * v.x + this.y * v.y;
        return dotProduct;
    }

    normalizedDot(v) {
        let normThis = new Vector2(this.x, this.y).normalize();
        let normV = new Vector2(v.x, v.y).normalize();
        let dotProduct = normThis.x * normV.x + normThis.y * normV.y;
        return dotProduct;
    }

    setMagnitude(mag) {
        this.normalize().multiply(mag);
        return this;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    project(v) {
        let dotProduct = this.x * v.x + this.y * v.y;
        let projectionAmount = dotProduct / (v.getMagnitude() * v.getMagnitude());
        this.multiply(projectionAmount);
        return this;
    }

    reflectAcrossAxis(axis) {
        let clone = this.clone();
        this.project(axis).multiply(2).subtract(clone);
        return this;
    }

    setAngle(angle) {
        this.set(Math.cos(Math.toRadians(angle)), Math.sin(Math.toRadians(angle)));
        return this;
    }

    rotate(angle) {
        let clone = this.clone();
        this.x = clone.x * Math.cos(Math.toRadians(angle)) - clone.y * Math.sin(Math.toRadians(angle));
        this.y = clone.x * Math.sin(Math.toRadians(angle)) + clone.y * Math.cos(Math.toRadians(angle));
        return this;
    }

    getAngle() {
        return Math.toDegrees(Math.atan(this.y / this.x));
    }

    reverse() {
        this.multiply(-1);
        return this;
    }

    inverse() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        return this;
    }

    lerp(x, y, amount) {
        let v = new Vector2();
        let a_ = amount;
        if (typeof x == 'number') {
            v.set(x, y);
        } else {
            v.set(x);
            a_ = y;
        }
        this.x = Math.lerp(this.x, v.x, a_);
        this.y = Math.lerp(this.y, v.y, a_);
        return this;
    }

    clamp(minX, maxX, minY, maxY) {
        this.x = Math.clamp(this.x, minX, maxX);
        this.y = Math.clamp(this.y, minY, maxY);
        return this;
    }

    random(scale) {
        this.x = Math.cos(Math.randomBetween(0, Math.TWO_PI)) * scale;
        this.y = Math.sin(Math.randomBetween(0, Math.TWO_PI)) * scale;
        return this;
    }

    distance(x, y) {
        let v = new Vector2();
        if (x == 'number') {
            v.set(x, y);
        } else {
            v.set(x);
        }
        return Math.distance(this.x, this.y, v.x, v.y);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}