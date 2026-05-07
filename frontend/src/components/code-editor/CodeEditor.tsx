import React, { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'prismjs/themes/prism-tomorrow.css';

import styles from './CodeEditor.module.css';

(Prism as any).plugins.autoloader.languages_path =
  'https://unpkg.com/prismjs@1.29.0/components/';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (code: string) => void;
  onSubmit: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  onSubmit
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [language, value]);

  return (
    <div className={styles.editorWrap} data-testid='code-editor'>
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) =>
          Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.javascript,
            language
          )
        }
        padding={16}
        className={styles.editor}
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 16,
          background: '#2F576B',
          color: '#fff',
          borderRadius: 16
        }}
      />
      <button className={styles.submitBtn} onClick={onSubmit} type='button'>
        Отправить
      </button>
    </div>
  );
};
