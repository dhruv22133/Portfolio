export class SplitText {
  elements: HTMLElement[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];

  constructor(
    target: string | HTMLElement | (string | HTMLElement)[] | NodeListOf<HTMLElement>,
    options?: { type?: string; linesClass?: string }
  ) {
    let targets: HTMLElement[] = [];

    if (typeof target === "string") {
      targets = Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      targets = [target];
    } else if (Array.isArray(target)) {
      target.forEach((t) => {
        if (typeof t === "string") {
          targets.push(...Array.from(document.querySelectorAll(t) as NodeListOf<HTMLElement>));
        } else if (t instanceof HTMLElement) {
          targets.push(t);
        }
      });
    } else if (target instanceof NodeList) {
      targets = Array.from(target) as HTMLElement[];
    }

    this.elements = targets;

    const type = options?.type || "words,chars";
    const linesClass = options?.linesClass || "split-line";

    targets.forEach((el) => {
      // Save original innerHTML if not already saved
      if (!(el as any)._originalHTML) {
        (el as any)._originalHTML = el.innerHTML;
      }

      const text = el.textContent || "";
      el.innerHTML = "";

      const wordsArray = text.split(/\s+/);
      const tempWords: HTMLElement[] = [];

      wordsArray.forEach((wordText, wIdx) => {
        if (wordText === "") return;

        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        if (type.includes("chars")) {
          Array.from(wordText).forEach((charText) => {
            const charSpan = document.createElement("span");
            charSpan.className = "split-char";
            charSpan.style.display = "inline-block";
            charSpan.textContent = charText;
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          });
        } else {
          wordSpan.textContent = wordText;
        }

        el.appendChild(wordSpan);
        tempWords.push(wordSpan);
        this.words.push(wordSpan);

        // Add space after word if it is not the last word
        if (wIdx < wordsArray.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      // Group words into lines based on their vertical offset
      if (type.includes("lines") && tempWords.length > 0) {
        // Force reflow
        const rects = tempWords.map((w) => w.getBoundingClientRect());

        const lineGroups: HTMLElement[][] = [];
        let currentLine: HTMLElement[] = [];
        let currentTop = -9999;

        tempWords.forEach((word, idx) => {
          const rect = rects[idx];
          // Use 6px offset tolerance
          if (Math.abs(rect.top - currentTop) > 6) {
            if (currentLine.length > 0) {
              lineGroups.push(currentLine);
            }
            currentLine = [word];
            currentTop = rect.top;
          } else {
            currentLine.push(word);
          }
        });

        if (currentLine.length > 0) {
          lineGroups.push(currentLine);
        }

        // Rebuild container with line divs
        el.innerHTML = "";
        lineGroups.forEach((lineWords) => {
          const lineDiv = document.createElement("div");
          lineDiv.className = linesClass;
          lineDiv.style.display = "block";
          lineDiv.style.position = "relative";
          lineDiv.style.overflow = "hidden";

          lineWords.forEach((word, wIdx) => {
            lineDiv.appendChild(word);
            if (wIdx < lineWords.length - 1) {
              lineDiv.appendChild(document.createTextNode(" "));
            }
          });

          el.appendChild(lineDiv);
          this.lines.push(lineDiv);
        });
      }
    });
  }

  revert() {
    this.elements.forEach((el) => {
      if ((el as any)._originalHTML) {
        el.innerHTML = (el as any)._originalHTML;
      }
    });
  }
}
