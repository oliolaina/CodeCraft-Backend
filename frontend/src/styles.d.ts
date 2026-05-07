declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// src/declarations.d.ts
declare module '*.png' {
  const value: string; // или `const value: StaticImageData;` для next/image
  export default value;
}
