var injectModule2 = function () {
  let rand = {
    noise: function () {
      let SIGN = Math.random() < Math.random() ? -1 : 1;
      return Math.floor(Math.random() + SIGN * Math.random());
    },
    sign: function () {
      const tmp = [-1, -1, -1, -1, -1, -1, +1, -1, -1, -1];
      const index = Math.floor(Math.random() * tmp.length);
      return tmp[index];
    },
  };

  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    get: new Proxy(Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight").get, {
      apply(target, self, args) {
        const height = Math.floor(self.getBoundingClientRect().height);
        const valid = height && rand.sign() === 1;
        const result = valid ? height + rand.noise() : height;
        return result;
      },
    }),
  });

  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    get: new Proxy(Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth").get, {
      apply(target, self, args) {
        const width = Math.floor(self.getBoundingClientRect().width);
        const valid = width && rand.sign() === 1;
        const result = valid ? width + rand.noise() : width;
        return result;
      },
    }),
  });

  document.documentElement.dataset.fbscriptallow = true;
};

let scriptModule2 = document.createElement("script");
scriptModule2.textContent = "(" + injectModule2 + ")()";
document.documentElement.appendChild(scriptModule2);
scriptModule2.remove();
