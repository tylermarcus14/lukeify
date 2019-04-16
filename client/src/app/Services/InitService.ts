import { Injectable } from '@angular/core';

@Injectable()
export class InitService {

    constructor() {
    }

    Init() {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 0);
        });
    }
}
