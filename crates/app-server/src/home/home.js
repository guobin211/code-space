// Async Main Function
(() => {
  console.log('start');
  const init = () => {
    const component = {
      data: {
        count: 0,
      },
      template: document.getElementById('count'),
      methods: {
        increment() {
          component.data.count++;
          component.render();
        },
        decrement() {
          component.data.count--;
          component.render();
        },
      },
      render() {
        component.template.innerHTML = component.data.count;
      },
    };
    console.log(component);
    addEvents(component.methods, window);
  };

  window.onload = init;

  const addEvents = (methods, target) => {
    for (const key in methods) {
      const fn = methods[key];
      Object.defineProperty(target, key, {
        get() {
          return fn;
        },
      });
    }
  };
})();
