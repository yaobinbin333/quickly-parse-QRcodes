export class Saver {
    save(key: string, value: any) {
      localStorage.setItem(key, value);
    }
    getValue(key: string) {
      return localStorage.getItem(key);
    }
    // 只有在第一次的时候，才设置
    initialSave(key: string, value: any) {
      if(this.getValue(key) === null) {
        this.save(key, value);
      }
    }
}
