import Quill from "quill";

// Extend the built-in BlockEmbed class
const BlockEmbed = Quill.import("blots/block");

class ProductSectionBlot extends BlockEmbed {
  static blotName = "productSection"; // Unique name
  static tagName = "div";
  static className = "product-section";

  static create(value: { title: string; text: string; imgSrc: string }) {
    const node = super.create();

    // Create text section
    const textContainer = document.createElement("div");
    textContainer.classList.add("text");
    textContainer.innerHTML = `<h2>${value.title}</h2><p>${value.text}</p>`;

    // Create image section
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image");
    const img = document.createElement("img");
    img.src = value.imgSrc;
    img.alt = "Product Image";
    imageContainer.appendChild(img);

    // Append elements
    node.appendChild(textContainer);
    node.appendChild(imageContainer);

    return node;
  }

  static value(node: HTMLDivElement) {
    return {
      title: node.querySelector("h2")?.innerText || "",
      text: node.querySelector("p")?.innerText || "",
      imgSrc: node.querySelector("img")?.src || "",
    };
  }
}

// Register the custom blot
Quill.register(ProductSectionBlot);
