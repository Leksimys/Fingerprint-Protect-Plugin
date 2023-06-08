var injectModule4 = function () {
    const getImageData = CanvasRenderingContext2D.prototype.getImageData;
    //
    let noisify = function (canvas, context) {
      if (context) {
        const shift = {
          'r': Math.floor(Math.random() * 10) - 5,
          'g': Math.floor(Math.random() * 10) - 5,
          'b': Math.floor(Math.random() * 10) - 5,
          'a': Math.floor(Math.random() * 10) - 5
        };
        //
        const width = canvas.width;
        const height = canvas.height;
        //
        if (width && height) {
          const imageData = getImageData.apply(context, [0, 0, width, height]);
          //
          for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
              const n = ((i * (width * 4)) + (j * 4));
              imageData.data[n + 0] = imageData.data[n + 0] + shift.r;
              imageData.data[n + 1] = imageData.data[n + 1] + shift.g;
              imageData.data[n + 2] = imageData.data[n + 2] + shift.b;
              imageData.data[n + 3] = imageData.data[n + 3] + shift.a;
            }
          }
          context.putImageData(imageData, 0, 0); 
        }
      }
    };
    //
    HTMLCanvasElement.prototype.toBlob = new Proxy(HTMLCanvasElement.prototype.toBlob, {
      apply(target, self, args) {
        noisify(self, self.getContext("2d"));
        //
        return Reflect.apply(target, self, args);
      }
    });
    //
    HTMLCanvasElement.prototype.toDataURL = new Proxy(HTMLCanvasElement.prototype.toDataURL, {
      apply(target, self, args) {
        noisify(self, self.getContext("2d"));
        //
        return Reflect.apply(target, self, args);
      }
    });
    //
    CanvasRenderingContext2D.prototype.getImageData = new Proxy(CanvasRenderingContext2D.prototype.getImageData, {
      apply(target, self, args) {
        noisify(self.canvas, self);
        //
        return Reflect.apply(target, self, args);
      }
    });
     document.documentElement.dataset.cbscriptallow = true;
  };
  
  let script_1 = document.createElement("script");
  script_1.textContent = "(" + injectModule4 + ")()";
  document.documentElement.appendChild(script_1);
  script_1.remove();
