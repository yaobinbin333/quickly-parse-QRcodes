// 配置
import {Saver} from "./Saver";
import {toBoolean} from "../utils";
type notObject = boolean | string | number | undefined | null;

export class Configurer extends Saver{
    configs: Config[];
    static instance: Configurer;
    static getInstance(configs?: Config[]) {
        if(!Configurer.instance) {
            Configurer.instance = new Configurer(configs);
        }
        return Configurer.instance;
    }
    constructor(configs?: Config[]) {
        super();
        this.configs = configs;
        if(configs) {
            this.setDefault();
        }
    }
    add(type: string, defaultValue: boolean, postHandle: Function) {
        this.configs.push({
            type,
            defaultValue,
            postHandle
        })
    }
    emit(type: string, ...args: any[]) {
        if(toBoolean(this.getValue(type))) {
            this.configs.forEach(config => {
                if(config.type === type) {
                    config.postHandle(...args);
                }
            })
        }
    }
    setDefault() {
        this.configs.forEach(config => {
            this.initialSave(config.type, config.defaultValue)
        })
    }

}
