import React from 'react';
import styles from './CodeBlock.module.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code, language]);

  return (
    <div className={styles.codeBlock}>
      <div className={styles.language}>{language}</div>
      <pre className={styles.pre}>
        <code ref={ref}>{code}</code>
      </pre>
    </div>
  );
};
