class PinLogin {
    constructor({ el, redirectTo, maxNumbers = 6, maxAttempts = 7 }) {
      this.el = {
        main: el,
        numPad: el.querySelector(".pin-login__numpad"),
        textDisplay: el.querySelector(".pin-login__text"),
      };
      this.redirectTo = redirectTo;
      this.maxNumbers = maxNumbers;
      this.maxAttempts = maxAttempts;
      this.currentAttempts = 0;
      this.value = "";
  
      this.generatePad();
    }
  
    generatePad() {
      const padLayout = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "backspace",
        "0",
        "done",
      ];
      padLayout.forEach((key) => {
        const insertBreak = key.search(/[369]/) !== -1;
        const keyEl = document.createElement("div");
  
        keyEl.classList.add("pin-login__key");
        keyEl.classList.toggle("material-icons", isNaN(key));
        keyEl.textContent = key;
        keyEl.addEventListener("click", () => {
          this._handleKeyPress(key);
        });
        this.el.numPad.appendChild(keyEl);
  
        if (insertBreak) {
            this.el.numPad.appendChild(document.createElement("br"));
        }
      });
    }
  
    _handleKeyPress(key) {
      switch (key) {
        case "backspace":
          this.value = this.value.substring(0, this.value.length - 1);
          break;
        case "done":
          this._attemptLogin();
          break;
        default:
          if (this.value.length < this.maxNumbers && !isNaN(key)) {
            this.value += key;
          }
          break;
      }
  
      this._updateValueText();
    }
  
    _updateValueText() {
      this.el.textDisplay.value = "_".repeat(this.value.length);
      this.el.textDisplay.classList.remove("pin-login__text--error");
    }
  
    _attemptLogin() {
      if (this.value.length > 0) {
            if (this.value === "123456") {
              window.location.replace("falia_buktiTransfer.html");
            } else {
                this.currentAttempts++;
                const remainingAttempts = this.maxAttempts - this.currentAttempts;
            if (remainingAttempts > 0) {
                this.el.textDisplay.classList.add("pin-login__text--error");
                this.value = "";
                this._updateValueText();
                const errorEl = document.createElement("div");
                errorEl.classList.add("error-message");
                errorEl.style.color = "white";
                errorEl.style.width = "320px";
                errorEl.style.marginLeft =  "440px";
                errorEl.style.backgroundColor = "#d81616";
                errorEl.style.padding = "10px";
                errorEl.style.borderRadius = "5px";
                errorEl.style.fontSize = "18px"; // menambahkan ukuran font
                errorEl.style.fontFamily = "Poppins, sans-serif";
                errorEl.textContent = `PIN YANG ANDA MASUKKAN SALAH!\nSISA PERCOBAAN: ${remainingAttempts}`;
                this.el.main.appendChild(errorEl);
                setTimeout(() => {
                    errorEl.remove();
                }, 20000);
            } else {
                const errorEl = document.createElement("div");
                errorEl.classList.add("error-message");
                errorEl.style.color = "white";
                errorEl.style.backgroundColor = "#d81616";
                errorEl.style.width = "320px";
                errorEl.style.marginLeft = "440px";
                errorEl.style.padding = "10px";
                errorEl.style.borderRadius = "5px";
                errorEl.style.fontSize = "14px"; // menambahkan ukuran font
                errorEl.style.fontFamily = "Poppins, sans-serif";
                errorEl.textContent = `ANDA SUDAH MENCOBA ${this.maxAttempts} KALI. SILAHKAN COBA LAGI DALAM 30 MENIT`;
                this.el.main.appendChild(errorEl);
                setTimeout(() => {
                    errorEl.remove();
                    }, 20000);
                if (remainingAttempts === 0) {
                    setTimeout(() => {
                        window.location.href = 'login.html';
                        errorEl.remove();
                        }, 20000);
                    }
                }
            }
              
        }
    }
}


new PinLogin({
    el: document.getElementById("mainPinLogin"),
  });
            