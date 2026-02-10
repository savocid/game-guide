class ManualSaveWrapper {
	constructor(data, storageKey) {
		this.storageKey = storageKey;
		this.data = data;
		
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			Object.assign(this.data, JSON.parse(saved));
		}
		
		const proxy = this.createProxy();
		
		proxy.save = () => this.save();
		proxy.clear = () => this.clear();
		proxy.clearAll = () => this.clearAll();
		
		return proxy;
	}
	
	createProxy() {
		const handler = {
			set: (target, prop, value) => {
				target[prop] = value;
				return true;
			},
			
			deleteProperty: (target, prop) => {
				delete target[prop];
				return true;
			},
			
			get: (target, prop) => {
				const value = target[prop];
				
				if (Array.isArray(target)) {
					const arrayMethods = ['push', 'pop', 'splice', 'shift', 'unshift', 'sort', 'reverse'];
					if (arrayMethods.includes(prop)) {
						return function(...args) {
							return value.apply(target, args);
						};
					}
				}
				
				return value;
			}
		};
		
		return new Proxy(this.data, handler);
	}
	
	save() {
		localStorage.setItem(this.storageKey, JSON.stringify(this.data));
		return true;
	}

	clear() {
		localStorage.removeItem(this.storageKey);
		return true;
	}
}


