class ManualSaveWrapper {
	constructor(data) {
		this.data = data;
	
		const proxy = this.createProxy();
		
		proxy.load = () => this.load();
		proxy.save = () => this.save();
		proxy.clear = () => this.clear();
		
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
		const storageKey = `GameGuideData_${this.data.id}`;
		localStorage.setItem(storageKey, JSON.stringify(this.data));
		return true;
	}

	load() {
		const storageKey = `GameGuideData_${this.data.id}`;
		
		const saved = localStorage.getItem(storageKey);

		if (saved) {
			Object.assign(this.data, JSON.parse(saved));
			return true;
		}
		else {
			return false;
		}
		
	}

	clear() {
		const storageKey = `GameGuideData_${this.data.id}`;

		localStorage.removeItem(storageKey);
		return true;
	}
}


